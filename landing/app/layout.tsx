"use client";

import Navbar from "@/components/navbar";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import colors from "tailwindcss/colors";
import "./globals.css";
import Footer from "@/components/sections/footer";
import FirebaseProvider from "@/lib/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <FirebaseProvider>
            <MantineProvider
              theme={{
                primaryColor: "tailBlue",
                colors: {
                  tailBlue: [
                    colors.blue[100],
                    colors.blue[200],
                    colors.blue[300],
                    colors.blue[400],
                    colors.blue[500],
                    colors.blue[600],
                    colors.blue[700],
                    colors.blue[800],
                    colors.blue[900],
                    colors.blue[950],
                  ],
                },
              }}
            >
              <Navbar />
              <div>{children}</div>
              <Footer />
            </MantineProvider>
          </FirebaseProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
