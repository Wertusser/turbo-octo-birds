"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, shorten } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useNameSearch } from "@/hooks/use-name-search";
import { User } from "@/lib/types";
import { useDebounce } from "@/hooks/use-debounce";

export type Props = {
  accessKey: string;
  onUserSelect: (user: User) => void;
};

export function UserPicker({ accessKey, onUserSelect }: Props) {
  const [open, setOpen] = useState(false);
  const { users, isPending, search, query } = useNameSearch(accessKey);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState("");
  const debouncedSearch = useDebounce((name) => search(name), 2000);

  useEffect(() => {
    if (!inputValue) return;
    debouncedSearch(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (!selectedUser) return;
    onUserSelect(selectedUser);
  }, [selectedUser]);

  const isLoading = isPending || query !== inputValue;
  console.log(query, inputValue, isPending);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUser ? (
            <>
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage src={selectedUser.name} alt={selectedUser.name} />
                <AvatarFallback>
                </AvatarFallback>
              </Avatar>
              {selectedUser.name} ({shorten(selectedUser.address)})
            </>
          ) : (
            "Select user..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white">
        <Command>
          <CommandInput
            placeholder="Search users..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {!isLoading ? (
              <CommandEmpty className="w-full">No user found.</CommandEmpty>
            ) : null}

            <CommandGroup>
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <CommandItem key={index} disabled>
                      <Skeleton className="h-6 w-6 rounded-full mr-2 bg-black" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </CommandItem>
                  ))
                : users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.name}
                      onSelect={() => {
                        setSelectedUser(user);
                        setOpen(false);
                      }}
                    >
                      <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage src={user.name} alt={user.name} />
                        <AvatarFallback>
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate">{user.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {user.address}
                        </p>
                      </div>
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          selectedUser?.id === user.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
