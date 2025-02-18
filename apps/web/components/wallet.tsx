import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Wallet } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { shorten } from "@/lib/utils";
import { useSiwe } from "@/hooks/use-siwe";
// import WalletContent from "./wallet/wallet-content";
import { SetNameDialog } from "./wallet/set-name-dialog";
import { useName } from "@/hooks/use-name";
import WalletContent from "./wallet/wallet-content";

export function EVMWallet() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signSiwe, data } = useSiwe();

  const { name, setName: setNameMutation } = useName(data?.access_token || "");

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
            <Button
              className={"bg-sky-500/100 text-white font-bold"}
              onClick={() => signSiwe()}
            >
              Sign Up
            </Button>
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
          <div className="flex items-center space-x-2">
            <span className="text-sm font-normal text-muted-foreground">
              {name || shorten(address)}
            </span>
            <SetNameDialog
              name={name || address}
              onConfirm={(name) => setNameMutation(name)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => disconnect()}
              className="h-8 w-8"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <WalletContent accessKey={data.access_token} />
      </CardContent>
    </Card>
  );
}
