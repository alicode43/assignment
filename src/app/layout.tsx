import React from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-700 text-gray-900 min-h-screen relative">
        <NavBar />
        {/* Main Content */}
        <main className="p-6">
          <Link href="/">
      
          </Link>
          {children}
        </main>
      </body>
    </html>
  );
}
