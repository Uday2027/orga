import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/top-bar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CartDrawer } from "@/components/cart-drawer";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} | ${APP_TAGLINE}`,
  description: "১০০% প্রাকৃতিক ও ভেষজ পণ্য। প্রকৃতির শক্তিতে সুস্থ থাকুন। ভেষজ গুঁড়ো, চা, হাটি কেয়ার ও আরও অনেক কিছু।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CartDrawer />
      </body>
    </html>
  );
}
