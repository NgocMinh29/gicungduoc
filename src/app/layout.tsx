import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { theme } from "@/theme";
import "@/theme/global.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "@/contexts/auth/firebase-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
