import React from "react";
import NavBar from "@/components/NavBar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <NavBar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
