import { Abi } from "abitype";
import { Interface } from "ethers";

export const asAbi = (iface: Interface): Abi => {
  return JSON.parse(iface.formatJson()) as Abi;
};
