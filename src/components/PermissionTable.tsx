"use client"
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "permission", headerName: "Permission Name", width: 200 },
];


export default function PermissionTable() {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    axios.get("/api/permissions")
      .then((response) => {
        const permissionsWithId = response.data.map((permission: string, index: number) => ({
          id: index + 1,
          permission,
        }));
        setPermissions(permissionsWithId);
        console.log("Fetched permissions data:", permissionsWithId);
      })
      .catch((error) => console.error("Error fetching permissions:", error));
  }, []);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={permissions}
        columns={columns}
        autoHeight
        sx={{
          "& .MuiDataGrid-cell": {
            color: "black", // Cell font color
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "black", // Column header font color
          },
        }}
      />
    </div>
  );
}
