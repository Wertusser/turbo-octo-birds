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
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { useName } from "@/hooks/use-name";

type SetNameDialogProps = {
  accessKey: string;
};

export function SetNameDialog({ accessKey }: SetNameDialogProps) {
  const { name, setName: setNameMutation, isLoading } = useName(accessKey);
  const [nextName, setNextName] = useState(name);
  const validInput = nextName.length > 0 && nextName !== name;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Set name</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="vitalik"
              value={nextName}
              onChange={(e) => {
                e.preventDefault();
                setNextName(e.target.value);
              }}
            />
          </div>

          <DialogClose asChild>
            <Button
              type="button"
              disabled={!validInput}
              variant="secondary"
              className="w-full"
              onClick={() => setNameMutation(nextName)}
            >
              Confirm
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
