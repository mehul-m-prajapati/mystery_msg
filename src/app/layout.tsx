import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import AuthProvider from "@/context/AuthProvider";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "True Feedback",
  description: "Real feedback from real people.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <AuthProvider>

        <body className={inter.className}>
            {children}
        </body>

      </AuthProvider>
    </html>
  );
}
