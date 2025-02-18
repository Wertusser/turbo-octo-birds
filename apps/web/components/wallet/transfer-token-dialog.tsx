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
import { ArrowUpRight } from "lucide-react";

type TransferTokenDialogProps = {
  asset: any;
  onClose: () => void;
};

export function TransferTokenDialog({
  asset,
  onClose,
}: TransferTokenDialogProps) {
  return (
    <Dialog onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          // onClick={onTransfer}
          className="text-muted-foreground hover:text-foreground "
        >
          <ArrowUpRight className="h-4 w-4" />
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
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="0" />
            <span className="font-sm">MAX: {asset.balance.toFixed(4)}</span>
          </div>
          <Button className="w-full">Confirm Transfer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
