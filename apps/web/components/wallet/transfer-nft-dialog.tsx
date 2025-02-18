import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Transfer {"name" in asset ? asset.name : asset.symbol}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input id="recipient" placeholder="0x..." />
          </div>
          <Button className="w-full">Confirm Transfer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
