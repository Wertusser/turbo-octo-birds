"use client";

import { Providers } from "@/components/providers";
import { EVMWallet } from "@/components/wallet";

export default function Home() {
  return (
    <Providers>
      <main className="w-full min-h-screen flex flex-col justify-center items-center">
        <EVMWallet />
      </main>
    </Providers>
  );
}
