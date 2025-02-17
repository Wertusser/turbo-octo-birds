import type { SiweMessage } from "./types/siwe.js";
import { getAddress, verifyMessage } from "ethers";

export function createSiweMessage(message: SiweMessage): string {
  const {
    chainId,
    domain,
    expirationTime,
    issuedAt = new Date(),
    nonce,
    notBefore,
    requestId,
    resources,
    scheme,
    uri,
    version,
  } = message;

  // Construct message
  const address = getAddress(message.address);
  const origin = (() => {
    if (scheme) return `${scheme}://${domain}`;
    return domain;
  })();
  const statement = (() => {
    if (!message.statement) return "";
    return `${message.statement}\n`;
  })();
  const prefix = `${origin} wants you to sign in with your Ethereum account:\n${address}\n\n${statement}`;

  let suffix = `URI: ${uri}\nVersion: ${version}\nChain ID: ${chainId}\nNonce: ${nonce}\nIssued At: ${issuedAt.toISOString()}`;

  if (expirationTime)
    suffix += `\nExpiration Time: ${expirationTime.toISOString()}`;
  if (notBefore) suffix += `\nNot Before: ${notBefore.toISOString()}`;
  if (requestId) suffix += `\nRequest ID: ${requestId}`;
  if (resources) {
    let content = "\nResources:";
    for (const resource of resources) {
      content += `\n- ${resource}`;
    }
    suffix += content;
  }

  return `${prefix}\n${suffix}`;
}

export function verifySiweMessage(
  message: SiweMessage,
  signature: string
): boolean {
  const signerAddress = verifyMessage(createSiweMessage(message), signature);
  return signerAddress.toLowerCase() === message.address.toLowerCase();
}
