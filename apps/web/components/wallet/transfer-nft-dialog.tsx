import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserPicker } from "./user-picker";
import { User } from "@/lib/types";

type TransferNFTDialogProps = {
  accessKey: string;
  asset: any;
};

export function TransferNFTDialog({
  accessKey,
  asset,
}: TransferNFTDialogProps) {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <Dialog>
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
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Confirm
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
