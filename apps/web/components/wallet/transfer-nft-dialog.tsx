import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UserPicker } from "./user-picker";
import { User } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useErc721Transfer } from "@/hooks/use-erc721-transfer";
import { useOwnedNfts } from "@/hooks/use-owned-nfts";

type TransferNFTDialogProps = {
  accessKey: string;
  asset: any;
};

export function TransferNFTDialog({
  accessKey,
  asset,
}: TransferNFTDialogProps) {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const { transferERC721, isConfirming, isPending, hash } = useErc721Transfer();
  const { refetch } = useOwnedNfts(accessKey);

  const validInput = !!user;
  const isLoading = isConfirming || isPending;
  const disabled = !validInput || isLoading;

  useEffect(() => {
    if (!hash) return;
    setOpen(false);
    refetch();
  }, [hash]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="mt-2 w-full">
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Transfer {"name" in asset ? asset.name : asset.symbol}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <UserPicker
              accessKey={accessKey}
              onUserSelect={(user) => setUser(user)}
            />
          </div>
          <Button
            type="button"
            disabled={disabled}
            variant="outline"
            className="mt-2 w-full"
            onClick={() => {
              if (!user) return;
              transferERC721(asset, user.address);
            }}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : `Confirm`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
