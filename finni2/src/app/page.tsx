"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import Header from "./components/Header";
import PatientDisplayContainer from "./components/PatientDisplayContainer";

export default function HomePage() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <PatientDisplayContainer />
    </QueryClientProvider>
  );
}
