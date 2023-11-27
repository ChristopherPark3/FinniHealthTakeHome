"use client";

import DataTable from "@/app/table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./_components/Header";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div id="MainPageContainer" className="flex flex-col p-8">
        <Header />
        <DataTable />
      </div>
    </QueryClientProvider>
  );
}
