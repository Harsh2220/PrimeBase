import "@/styles/globals.css";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { zoraSepolia } from "viem/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";
import "@coinbase/onchainkit/tailwind.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const config = createConfig({
  chains: [zoraSepolia],
  connectors: [
    coinbaseWallet({
      appName: "onchainkit",
    }),
  ],
  ssr: true,
  transports: {
    [zoraSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_KEY}
          chain={zoraSepolia}
        >
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
