"use client"
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
 
import DeleteIcon from '@mui/icons-material/Delete';

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export default function RoleTable({ roles }: { roles: Role[] }) {
  const [rows, setRows] = useState<Role[]>([]);

  useEffect(() => {
    axios.get("/api/roles")
      .then((response) => {
        setRows(response.data);
        console.log("Fetched roles data:", response.data); 
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, [roles]);

  const handleDelete = (id: number) => {
    axios.delete(`/api/roles`, { data: { id } })
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        console.log(`Deleted role with ID: ${id}`);
      })
      .catch((error) => console.error("Error deleting role:", error));
  };

  const columns: GridColDef[] = [
  
    { field: "name", headerName: "Role Name", width: 200 },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 300,
      renderCell: (params) => params.row.permissions ? params.row.permissions.join(", ") : "",
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 150,
    //   renderCell: (params) => (

        
    //     <Button
    //       variant="contained"
    //       color="error"
    //       onClick={() => handleDelete(params.row.id)}
    //       startIcon={<DeleteIcon />}
    //     >
   
    //     </Button>
    //   ),
    // },
    {
      field: "Delet",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <>
      
          <GridActionsCellItem
            icon={<DeleteIcon style={{ color: 'red' }} />}
            label="Delete"
            onClick={() => handleDelete(Number(params.id))}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ height:"100%", width: "100%" }}>
      <DataGrid 
        rows={rows} 
        columns={columns} 
        autoHeight 
 
      />
    </div>
  );
}
