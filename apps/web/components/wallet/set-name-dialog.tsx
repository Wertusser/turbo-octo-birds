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
import { Edit2 } from "lucide-react";
import { useState } from "react";

type SetNameDialogProps = {
  name: string;
  onClose: () => void;
};

export function SetNameDialog({ name: name_, onClose }: SetNameDialogProps) {
  const [name, setName] = useState(name_);

  return (
    <Dialog onOpenChange={onClose}>
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
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
          </div>
          <Button className="w-full">Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
