import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClinet = new QueryClient();

export const ReactQueryApp = () => {
  return (
    <QueryClientProvider client={queryClinet}>
      <div>ReactQueryApp</div>
    </QueryClientProvider>
  );
};
