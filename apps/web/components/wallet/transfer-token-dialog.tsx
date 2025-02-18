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
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TokenBalance, User } from "@/lib/types";
import { useErc20Transfer } from "@/hooks/use-erc20-transfer";
import { UserPicker } from "./user-picker";
import { useERC20Balances } from "@/hooks/use-erc20-balance";

type TransferTokenDialogProps = {
  accessKey: string;
  tokenBalance: TokenBalance;
};

export function TransferTokenDialog({
  accessKey,
  tokenBalance,
}: TransferTokenDialogProps) {
  const { token, balance } = tokenBalance;

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState(0);

  const { transferERC20, isConfirming, isPending, hash } = useErc20Transfer();
  const { refetch } = useERC20Balances(accessKey);
  
  const validInput = !!user && amount > 0 && amount <= balance;
  const isLoading = isConfirming || isPending;
  const disabled = !validInput || isLoading;

  useEffect(() => {
    if (!hash) return;
    setOpen(false);
    refetch();
  }, [hash]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTitle>Transfer {token.symbol}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <UserPicker
              accessKey={accessKey}
              onUserSelect={(user) => setUser(user)}
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

            <span className="font-sm">MAX: {balance.toFixed(4)}</span>
          </div>
          {/* <DialogClose asChild> */}
          <Button
            type="button"
            disabled={disabled}
            variant="outline"
            className="mt-2 w-full"
            onClick={() => {
              if (!user) return;
              transferERC20(token, user.address, amount);
            }}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : `Confirm`}
          </Button>
          {/* </DialogClose> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
