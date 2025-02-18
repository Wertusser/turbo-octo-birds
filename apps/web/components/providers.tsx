"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygon } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
};
export function Providers({ children }: Props) {
  const queryClient = new QueryClient();

  const config = getDefaultConfig({
    appName: "Wallet App",
    projectId: "YOUR_PROJECT_ID",
    chains: [polygon],
    ssr: false, // If your dApp uses server side rendering (SSR)
  });


  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
