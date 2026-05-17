import "@/styles/globals.css";
import "@/styles/vars.css";
import useNotification from "@/hooks/useNotification";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { useEffect } from "react";
import { MainProvider } from "@/context";
import AppWrapper from "@/components/app-wrapper/AppWrapper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App as AntdApp } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent({ Component, pageProps }) {
  const [isOnline] = useOnlineStatus();
  const [, error] = useNotification();

  useEffect(() => {
    if (!isOnline) {
      error("You are offline.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  useEffect(() => {
    const bootLoader = document.getElementById("oosri-boot-loader");
    if (!bootLoader) return undefined;

    const removeBootLoader = () => {
      bootLoader.setAttribute("data-hidden", "true");
      window.setTimeout(() => bootLoader.remove(), 200);
    };

    if (document.readyState === "complete") {
      removeBootLoader();
      return undefined;
    }

    window.addEventListener("load", removeBootLoader, { once: true });
    return () => window.removeEventListener("load", removeBootLoader);
  }, []);

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <MainProvider>
      <QueryClientProvider client={queryClient}>
        <AntdApp>
          <AppContent Component={Component} pageProps={pageProps} />
          {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
        </AntdApp>
      </QueryClientProvider>
    </MainProvider>
  );
}
