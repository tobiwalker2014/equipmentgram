import "tailwindcss/tailwind.css";
import "../styles/global.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import FirebaseProvider from "../lib/authContext";
import "../lib/firebaseConfig/init";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </FirebaseProvider>
  );
}
export default MyApp;
