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
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type TransferTokenDialogProps = {
  asset: any;
  onConfirm: (name: string, amount: number) => void;
};

export function TransferTokenDialog({
  asset,
  onConfirm,
}: TransferTokenDialogProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <Dialog>
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
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => {
                e.preventDefault();
                setAmount(Number(e.target.value));
              }}
            />

            <span className="font-sm">MAX: {asset.balance.toFixed(4)}</span>
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => onConfirm(name, amount)}
            >
              Confirm
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
