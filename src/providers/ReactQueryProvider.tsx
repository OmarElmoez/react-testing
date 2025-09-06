import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  // Using useState(() => new QueryClient()) ensures 
  // the QueryClient instance is created only once 
  // and persists for the lifetime of the provider component.
  // If you created it directly in the function body, 
  // a new instance would be created on every render, 
  // which could break React Query's caching 
  // and cause unnecessary network requests. 
  // Using state here guarantees a stable, single instance.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
