import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TransferTokenDialogProps = {
  asset: any;
  onClose: () => void;
};

export function TransferTokenDialog({
  asset,
  onClose,
}: TransferTokenDialogProps) {
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
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="0" />
          </div>
          <Button className="w-full">Confirm Transfer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
