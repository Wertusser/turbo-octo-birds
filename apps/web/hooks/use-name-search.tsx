import { $api } from "@/lib/openapi-client";
import { User } from "@/lib/types";
import { useState } from "react";

export const useNameSearch = (accessToken: string) => {
  const {
    mutateAsync,
    data: users,
    isError,
    isPending,
    error,
  } = $api.useMutation("post", "/user/search", {});
  const [query, setQuery] = useState("");

  return {
    users: (users ?? []) as unknown as User[],
    isError,
    isPending,
    error,
    query,
    search: (name: string) => {
      setQuery(name);
      mutateAsync({
        body: { name },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    },
  };
};
