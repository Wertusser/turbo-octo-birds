import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
type Token = {
  name: string;
  symbol: string;
  balance: string;
};

type NFT = {
  id: string;
  name: string;
  image: string;
  quantity?: number;
};

type EVMWalletProps = {
  tokens?: Token[];
  nfts721?: NFT[];
  nfts1155?: NFT[];
};



export default function WalletBody({}: EVMWalletProps) {
  const [selectedAsset, setSelectedAsset] = useState<Token | NFT | null>(null);

  return (
    <Tabs defaultValue="tokens" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="erc721">ERC721</TabsTrigger>
        <TabsTrigger value="erc1155">ERC1155</TabsTrigger>
      </TabsList>
      <TabsContent value="tokens">
        <div className="space-y-4">
          
        </div>
      </TabsContent>
      <TabsContent value="erc721">
        <div className="grid grid-cols-2 gap-4">
          
        </div>
      </TabsContent>
      <TabsContent value="erc1155">
        <div className="grid grid-cols-2 gap-4">
          
        </div>
      </TabsContent>
    </Tabs>
  );
}

