"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import PatientDisplayTable from "./components/PatientDisplayTable";
import Header from "./components/Header";

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <PatientDisplayTable />
    </QueryClientProvider>
  );
}
