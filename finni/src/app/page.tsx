"use client";

import Header from "./components/Header";
import PatientDisplayContainer from "./components/PatientDisplayContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <PatientDisplayContainer />
    </QueryClientProvider>
  );
}
