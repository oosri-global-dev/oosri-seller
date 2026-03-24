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

// Create a client outside the component to prevent recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  const [isOnline] = useOnlineStatus();
  const [success, error] = useNotification();

  useEffect(() => {
    const bootLoader = document.getElementById("oosri-boot-loader");

    if (!bootLoader) {
      return undefined;
    }

    bootLoader.setAttribute("data-hidden", "true");

    const cleanupTimer = window.setTimeout(() => {
      bootLoader.remove();
    }, 200);

    return () => {
      window.clearTimeout(cleanupTimer);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      error("You are offline.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  return (
    <MainProvider>
      <StyledComponentsRegistry>
        <QueryClientProvider client={queryClient}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StyledComponentsRegistry>
    </MainProvider>
  );
}
