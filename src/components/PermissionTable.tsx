"use client"
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';

export default function PermissionTable({ refresh }: { refresh: boolean }) {
  const [permissions, setPermissions] = useState([]);

  // const handleDelete = async (id: number) => {
  //   try {
  //     const response = await fetch('/api/permissions', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ permission: id }),
  //     });

  //     if (response.ok) {
  //       setPermissions((prevPermissions) => prevPermissions.filter((permission) => permission.id !== id));
  //       console.log(`Deleted permission with id: ${id}`);
  //     } else {
  //       const errorText = await response.text();
  //       console.error("Error deleting permission:", errorText);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting permission:", error);
  //   }
  // };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "permission", headerName: "Permission Name", width: 200 },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   renderCell: (params) => (
    //     <IconButton
    //       color="error"
    //       onClick={() => handleDelete(params.row.id)}
    //     >
    //       <DeleteIcon />
    //     </IconButton>
    //   ),
    // },
  ];

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
  }, [refresh]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={permissions}
        columns={columns}
        autoHeight
        sx={{
          "& .MuiDataGrid-cell": {
            color: "black", 
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "black",  
          },
        }}
      />
    </div>
  );
}
