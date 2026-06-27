import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "link shortener service",
  description: "a service that receives an endpoint URL from the user and then gives back a shortend URL for it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body
      cz-shortcut-listen="true"
      >
        <SessionProvider>
          <Header />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}