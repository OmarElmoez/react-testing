import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const AllProviders = ({children}: {children: ReactNode}) => {
 const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });

    return (<QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>)
}

export default AllProviders