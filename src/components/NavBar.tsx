"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">RBAC Dashboard</h1>
        {isClient && (
          <div className="space-x-4">
            <Link href="/users" className="hover:underline">
              Users
            </Link>
            <Link href="/roles" className="hover:underline">
              Roles
            </Link>
            <Link href="/permissions" className="hover:underline">
              Permissions
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
