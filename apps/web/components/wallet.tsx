import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { shorten } from "@/lib/utils";
import { useSiwe } from "@/hooks/use-siwe";
import { useERC20Balances } from "@/hooks/use-erc20-balance";

export function EVMWallet() {
  const { isConnected, address } = useAccount();
  const { signSiwe, data } = useSiwe();
  const { data: balances } = useERC20Balances(data?.access_token || "");

  if (!address || !data) {
    return (
      <Card className="w-full max-w-md mx-auto bg-background">
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
          <Wallet className="w-16 h-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-center">
            Connect Your Wallet
          </h2>
          <p className="text-center text-muted-foreground">
            Connect your wallet to view your assets and make transactions.
          </p>
          {!isConnected ? <ConnectButton /> : null}
          {isConnected && !data ? (
            <button onClick={() => signSiwe()}>sign Up</button>
          ) : null}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-background">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex justify-between items-center text-lg">
          <span>Wallet</span>
          <div>
            <span>{shorten(address)}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{/* <WalletContent /> */}</CardContent>
    </Card>
  );
}
