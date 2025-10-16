import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: "Rasa App",
  description: "Recipe recommendation app",
};

import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
