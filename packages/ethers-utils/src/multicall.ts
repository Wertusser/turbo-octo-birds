import { Contract, Interface, InterfaceAbi, Provider } from "ethers";
import { MulticallParameters, MulticallReturnType } from "./types/multicall.js";
import { ContractFunctionParameters } from "./types/contract.js";
import { Hex } from "./types/common.js";
import { Address } from "abitype";

type Aggregate3Calls = {
  target: Address;
  allowFailure: boolean;
  callData: Hex;
}[];

const multicall3Abi = new Interface([
  `function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calldata calls) public view returns (tuple(bool success, bytes returnData)[] memory returnData)`,
]);

const DEFAULT_BATCH_SIZE = 1024;
const DEFAULT_MULTICALL_ADDRESS = `0xcA11bde05977b3631167028862bE2a173976CA11`;

//@ts-ignore
export async function multicall<const contracts extends readonly unknown[]>(
  provider: Provider,
  parameters: MulticallParameters<contracts, true>
): Promise<MulticallReturnType<contracts, true>> {
  const {
    batchSize: batchSize_,
    multicallAddress: multicallAddress_,
    contracts: contracts_,
  } = parameters;

  const batchSize = batchSize_ ?? DEFAULT_BATCH_SIZE;
  const multicallAddress = multicallAddress_ ?? DEFAULT_MULTICALL_ADDRESS;
  const contracts = contracts_ as ContractFunctionParameters[];

  const multicallContract = new Contract(
    multicallAddress,
    multicall3Abi,
    provider
  );

  const chunkedCalls: Aggregate3Calls[] = [[]];
  let currentChunk = 0;
  let currentChunkSize = 0;
  for (let i = 0; i < contracts.length; i++) {
    const { abi, address, args, functionName } = contracts[
      i
    ] as ContractFunctionParameters;

    const iface = new Interface(abi as InterfaceAbi);
    const callData = iface.encodeFunctionData(functionName, args ?? []) as Hex;
    currentChunkSize += (callData.length - 2) / 2;

    // Check to see if we need to create a new chunk.
    if (
      // Check if batching is enabled.
      batchSize > 0 &&
      // Check if the current size of the batch exceeds the size limit.
      currentChunkSize > batchSize &&
      // Check if the current chunk is not already empty.
      chunkedCalls[currentChunk] &&
      chunkedCalls[currentChunk]!.length > 0
    ) {
      currentChunk++;
      chunkedCalls[currentChunk] = [];
      currentChunkSize = (callData.length - 2) / 2;
    }

    chunkedCalls[currentChunk] = [
      ...chunkedCalls[currentChunk]!,
      {
        allowFailure: true,
        callData,
        target: address,
      },
    ];
  }

  const aggregate3Results = await Promise.allSettled(
    chunkedCalls.map((calls) => multicallContract.aggregate3!(calls))
  );

  const results = [];
  for (let i = 0; i < aggregate3Results.length; i++) {
    const result = aggregate3Results[i]!;

    // If an error occurred in a `readContract` invocation (ie. network error),
    // then append the failure reason to each contract result.
    if (result.status === "rejected") {
      for (let j = 0; j < chunkedCalls[i]!.length; j++) {
        results.push({
          status: "failure",
          error: result.reason,
          result: undefined,
        });
      }
      continue;
    }

    const aggregate3Result = result.value;
    for (let j = 0; j < aggregate3Result.length; j++) {
      const { returnData, success } = aggregate3Result[j];

      const { abi, functionName } = contracts[
        results.length
      ] as ContractFunctionParameters;

      const iface = new Interface(abi as InterfaceAbi);

      if (!success) {
        results.push({ result: undefined, status: "failure" });
        continue;
      }

      let result = iface.decodeFunctionResult(functionName, returnData);
      if (result.length === 1) {
        result = result[0];
      }

      results.push({ result, status: "success" });
    }
  }

  if (results.length !== contracts.length)
    throw new Error("multicall results mismatch");

  return results as MulticallReturnType<contracts, true>;
}
