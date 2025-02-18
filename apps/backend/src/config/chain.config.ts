import { registerAs } from '@nestjs/config';

export default registerAs('chain-config', () => ({
  chainId: Number(process.env.CHAIN_ID) || 137,
  siwe: {
    domain: process.env.SIWE_DOMAIN,
    uri: process.env.SIWE_URI,
    version: process.env.SIWE_VERSION,
  },
}));
