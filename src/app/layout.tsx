import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./Footer/Footer";
import { Providers } from "../app/Provider";
import { UserContextProvider } from "./context/userContext/UserContextProvider";
import { CartContextProvider } from "./context/FavoriteAdd/FavoriteContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cima Quilty",
  description: "Discover Movies and TV Shows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContextProvider>
          <CartContextProvider>
            <Providers>{children}</Providers>
            <Footer />
          </CartContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
