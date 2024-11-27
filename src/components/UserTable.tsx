"use client"
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserTableProps {
  onDeleteUser: (id: number) => void;
  onAddUser: (newUser: User) => void;

}

const UserTable: React.FC<UserTableProps> = ({onAddUser, }) => {

  const [users, setUsers] = useState<User[]>([]);  
 
  const handleEdit = (id: number, field: keyof User, value: string | number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
    console.log(`Edited user with ID: ${id}, field: ${field}, value: ${value}`);
  };

  const handleDelete = (id: number) => {
    axios.delete(`/api/users`, { data: { id } })
      .then(() => {
        setUsers((prevRows) => prevRows.filter((row) => row.id !== id));
        console.log(`Deleted role with ID: ${id}`);
      })
      .catch((error) => console.error("Error deleting role:", error));
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No.", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
      {
        field: "edit",
        headerName: "Edit",
        width: 150,
        renderCell: (params) => (
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={() => handleEdit(Number(params.id), 'name', 'newValue')}
            />
        
          </>
        ),
      },
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

  useEffect(() => {
    axios.get("/api/users")
    .then((response) => {
      console.log("Fetched roles data:", response.data); 
      setUsers(response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        console.error("Users not found:", error);
      } else {
        console.error("Error fetching users:", error);
      }
    });
  }, [onAddUser]);

  return (
    <>
 
      <DataGrid 
        rows={users} 
        columns={columns}  
        getRowId={(row) => row.id} 
        processRowUpdate={(newRow) => {
          handleEdit(newRow.id, newRow.field, newRow.value);
          return newRow;
        }}
      />
    </>
  );
};

export default UserTable;
