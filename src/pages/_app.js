import "@/styles/globals.css";
import "@/styles/vars.css";
import useNotification from "@/hooks/useNotification";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { useEffect } from "react";
import StyledComponentsRegistry from "@/hooks/registry";
import { MainProvider } from "@/context";
import AppWrapper from "@/components/app-wrapper/AppWrapper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App({ Component, pageProps }) {
  const [isOnline] = useOnlineStatus();
  const [success, error] = useNotification();

  useEffect(() => {
    if (!isOnline) {
      error("You are offline.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  return (
    <MainProvider>
      <StyledComponentsRegistry>
        <QueryClientProvider client={new QueryClient()}>
          <ReactQueryDevtools initialIsOpen={false} />
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
         <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StyledComponentsRegistry>
    </MainProvider>
  );
}
