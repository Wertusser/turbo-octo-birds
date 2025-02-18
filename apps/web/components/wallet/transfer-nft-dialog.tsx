import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type TransferNFTDialogProps = {
  asset: any;
  onConfirm: (name: string) => void;
};

export function TransferNFTDialog({
  asset,
  onConfirm,
}: TransferNFTDialogProps) {
  const [name, setName] = useState("");

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
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              placeholder="vitalik"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => onConfirm(name)}
            >
              Confirm
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
