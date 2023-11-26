"use client";

import Header from "./components/Header";
import PatientDisplayContainer from "./components/PatientDisplayContainer";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

export default function HomePage() {

  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Header />
      <PatientDisplayContainer />
    </div>
    </QueryClientProvider>
  );
}
