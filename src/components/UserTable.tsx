"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Modal from "@/components/Modal";

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

const UserTable: React.FC<UserTableProps> = ({ onAddUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (
    id: number,
    field: keyof User,
    value: string | number
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
    console.log(`Edited user with ID: ${id}, field: ${field}, value: ${value}`);
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
  };

  const handleEditChange = (field: keyof User, value: string | number) => {
    if (editUser) {
      setEditUser({ ...editUser, [field]: value });
    }
  };

  const handleEditSave = () => {
    if (editUser) {
      const errors: { [key: string]: string } = {};
      if (!editUser.name) errors.name = "Name is required.";
      if (!editUser.email) errors.email = "Email is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (editUser.email && !emailRegex.test(editUser.email)) errors.email = "Please enter a valid email address.";
      if (!editUser.role) errors.role = "Role is required.";
      if (!editUser.status) errors.status = "Status is required.";

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      axios.put('/api/users', editUser)
        .then(response => {
          if (response.data.success) {
            setUsers(response.data.users);
            setEditUser(null);
            setValidationErrors({});
          }
        })
        .catch(error => {
          console.error("Error updating user:", error);
        });
    }
  };

  const handleEditCancel = () => {
    setEditUser(null);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/users`, { data: { id } })
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
            onClick={() => handleEditClick(params.row)}
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
            icon={<DeleteIcon style={{ color: "red" }} />}
            label="Delete"
            onClick={() => handleDelete(Number(params.id))}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("/api/users")
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
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        getRowId={(row) => row.id}
        processRowUpdate={(newRow) => {
          handleEdit(newRow.id, newRow.field, newRow.value);
          return newRow;
        }}
      />
      <Modal
        open={!!editUser}
        onClose={handleEditCancel}
        title="Edit User"
        onSubmit={handleEditSave}
      >
        <TextField
          fullWidth
          label="Name"
          value={editUser?.name || ""}
          onChange={(e) => handleEditChange("name", e.target.value)}
          margin="normal"
          required
          error={!!validationErrors.name}
          helperText={validationErrors.name}
        />
        <TextField
          fullWidth
          label="Email"
          value={editUser?.email || ""}
          onChange={(e) => handleEditChange("email", e.target.value)}
          margin="normal"
          required
          type="email"
          error={!!validationErrors.email}
          helperText={validationErrors.email}
        />

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 4 }} required error={!!validationErrors.role}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={editUser?.role || ""}
            onChange={(e) => handleEditChange("role", e.target.value)}
            label="Role"
          >
            <MenuItem value="">
              <em>Select a role</em>
            </MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
          {validationErrors.role && <p style={{ color: 'red' }}>{validationErrors.role}</p>}
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 4 }} required error={!!validationErrors.status}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={editUser?.status || ""}
            onChange={(e) => handleEditChange("status", e.target.value)}
            label="Status"
          >
            <MenuItem value="">
              <em>Select a Status</em>
            </MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
          {validationErrors.status && <p style={{ color: 'red' }}>{validationErrors.status}</p>}
        </FormControl>
      </Modal>
    </>
  );
};

export default UserTable;
