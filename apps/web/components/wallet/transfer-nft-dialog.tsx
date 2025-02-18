import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TransferNFTDialogProps = {
  asset: any;
  onClose: () => void;
};

export function TransferNFTDialog({ asset, onClose }: TransferNFTDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full"
        >
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
            <Input id="recipient" placeholder="vitalik" />
          </div>
          <Button className="w-full">Confirm Transfer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
