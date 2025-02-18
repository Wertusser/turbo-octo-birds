import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useERC20Balances } from "@/hooks/use-erc20-balance";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Avatar } from "../ui/avatar";
import { useOwnedNfts } from "@/hooks/use-owned-nfts";
import { useNft } from "use-nft";
import { TransferTokenDialog } from "./transfer-token-dialog";
import { TransferNFTDialog } from "./transfer-nft-dialog";

type EVMWalletProps = {
  accessKey: string;
};

type TokenItemProps = {
  token: any;
  onTransfer: () => void;
};

function TokenItem({ token }: TokenItemProps) {
  return (
    <div className="flex items-center justify-between py-4 px-6 hover:bg-muted/50 transition-colors">
      <div className="flex items-center space-x-3">
        <Avatar
          // src={token.token.icon || "/placeholder.svg"}
          // alt={token.token.name}
          className="w-8 h-8 rounded-full bg-slate-300"
        />
        <div>
          <h3 className="font-medium">{token.token.symbol.toUpperCase()}</h3>
          <p className="text-sm text-muted-foreground text-ellipsis max-w-50 overflow-hidden">
            {token.token.name}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-medium">{token.balance.toFixed(4)}</span>
        <TransferTokenDialog asset={token} onClose={() => []} />
      </div>
    </div>
  );
}

type NFTItemProps = {
  nft: any;
  onTransfer: () => void;
};

function NFTItem({ nft, onTransfer }: NFTItemProps) {
  // const {
  //   status,
  //   loading,
  //   error,
  //   reload,
  //   nft: nftData,
  // } = useNft("0xd07dc4262bcdbf85190c01c996b4c06a461d2430", "90473");
  return (
    <div className="p-4 bg-muted rounded-lg">
      <img
        src={nft.image}
        alt={nft.name}
        className="w-full bg-muted h-auto mb-2 rounded"
      />
      <h3 className="font-semibold">{nft.name}</h3>
      {nft.quantity && (
        <p className="text-sm text-muted-foreground">
          Quantity: {nft.quantity}
        </p>
      )}
      <TransferNFTDialog asset={nft} onClose={() => []} />
    </div>
  );
}

export default function WalletContent({ accessKey }: EVMWalletProps) {
  const { data: tokens = [], isLoading: isTokensLoading } =
    useERC20Balances(accessKey);
  const { data: nfts = [], isLoading: isNftsLoading } = useOwnedNfts(accessKey);

  if (!tokens.length && !nfts.length) {
    return <Skeleton />;
  }

  return (
    <Tabs defaultValue="tokens" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-slate-300 rounded-none border-b border-border">
        <TabsTrigger
          value="tokens"
          className="rounded-none hover:bg-white  data-[state=active]:bg-white"
        >
          Tokens
        </TabsTrigger>
        <TabsTrigger
          value="erc721"
          className="rounded-none hover:bg-white  data-[state=active]:bg-white"
        >
          ERC721
        </TabsTrigger>
        <TabsTrigger
          value="erc1155"
          className="rounded-none hover:bg-white data-[state=active]:bg-white"
        >
          ERC1155
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tokens" className="mt-0">
        <div className="divide-y divide-border h-96 overflow-x-hidden overflow-y-auto">
          {tokens.map((token, i) => (
            <TokenItem key={i} token={token} onTransfer={() => []} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="erc721" className="mt-0">
        <div className="grid grid-cols-2 gap-4 p-4 h-96 overflow-x-hidden overflow-y-auto">
          {nfts.map((nft, i) => (
            <NFTItem key={i} nft={nft} onTransfer={() => []} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="erc1155" className="mt-0">
        <div className="grid grid-cols-2 gap-4 p-4  h-96 overflow-x-hidden overflow-y-auto">
          {nfts.reverse().map((nft, i) => (
            <NFTItem key={i} nft={nft} onTransfer={() => []} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
