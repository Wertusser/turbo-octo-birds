import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useERC20Balances } from "@/hooks/use-erc20-balance";
import { Skeleton } from "../ui/skeleton";
import { Avatar } from "../ui/avatar";
import { useOwnedNfts } from "@/hooks/use-owned-nfts";
import { TransferTokenDialog } from "./transfer-token-dialog";
import { TransferNFTDialog } from "./transfer-nft-dialog";
import { useNameSearch } from "@/hooks/use-name-search";
import { TokenBalance } from "@/lib/types";

type EVMWalletProps = {
  accessKey: string;
};

type TokenItemProps = {
  accessKey: string;
  tokenBalance: TokenBalance;
};

type NFTItemProps = {
  accessKey: string;
  nft: any;
};

function TokenItem({ accessKey, tokenBalance }: TokenItemProps) {
  const { token, balance } = tokenBalance;
  return (
    <div className="flex items-center justify-between py-4 px-6 hover:bg-muted/50 transition-colors border-b-[1px]">
      <div className="flex items-center space-x-3">
        <Avatar
          // src={token.token.icon || "/placeholder.svg"}
          // alt={token.token.name}
          className="w-8 h-8 rounded-full bg-slate-300"
        />
        <div>
          <h3 className="font-medium">{token.symbol.toUpperCase()}</h3>
          <p className="text-sm text-muted-foreground text-ellipsis max-w-50 overflow-hidden">
            {token.name}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-medium">{balance.toFixed(4)}</span>
        <TransferTokenDialog
          accessKey={accessKey}
          tokenBalance={tokenBalance}
        />
      </div>
    </div>
  );
}

function NFTItem({ accessKey, nft }: NFTItemProps) {
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
      <TransferNFTDialog accessKey={accessKey} asset={nft} />
    </div>
  );
}

export default function WalletContent({ accessKey }: EVMWalletProps) {
  const { data: tokens = [], isLoading: isTokensLoading } =
    useERC20Balances(accessKey);
  const { data: nfts = [], isLoading: isNftsLoading } = useOwnedNfts(accessKey);

  if (!tokens.length && !nfts.length) {
    return (
      <div className="flex flex-col gap-2 p-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full bg-slate-300" />
        ))}
      </div>
    );
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
            <TokenItem key={i} accessKey={accessKey} tokenBalance={token} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="erc721" className="mt-0">
        <div className="grid grid-cols-2 gap-4 p-4 h-96 overflow-x-hidden overflow-y-auto">
          {nfts.map((nft, i) => (
            <NFTItem key={i} accessKey={accessKey} nft={nft} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="erc1155" className="mt-0">
        <div className="grid grid-cols-2 gap-4 p-4  h-96 overflow-x-hidden overflow-y-auto">
          {nfts.reverse().map((nft, i) => (
            <NFTItem key={i} accessKey={accessKey} nft={nft} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
