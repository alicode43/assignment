"use client";

import React from "react";
import PermissionTable from "@/components/PermissionTable";

export default function PermissionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Permission Management</h1>
      <PermissionTable />
    </div>
  );
}
