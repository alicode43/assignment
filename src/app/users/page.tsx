"use client"
import React, { useState, useEffect } from "react";
import UserTable from "@/components/UserTable";
import Modal from "@/components/Modal";
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"; 
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addUser, addtUser] = useState<User | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
 
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  const handleAddUser = (newUser: User) => {
    setUsers((prevUsers) => {
      if (prevUsers.find(user => user.id === newUser.id)) {
        return prevUsers;
      }
      return [...prevUsers, newUser];
    });
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event) event.preventDefault();

    if (!name || !email || !selectedRole || !selectedStatus) {
      setErrorMessage("All fields are required");
      return;
    }

    const errors: { [key: string]: string } = {};
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) errors.email = "Please enter a valid email address.";
    if (!selectedRole) errors.role = "Role is required.";
    if (!selectedStatus) errors.status = "Status is required.";
    setValidationErrors(errors);
    if (status) errors.status = "Status is required.";

    const usersData = {
      name: name,
      email: email,
      role: selectedRole,
      status: selectedStatus,
    };
    axios.post("/api/users", usersData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Users added:", response.data);
        handleAddUser(response.data.users);
        console.log("Users updated:", response.data.users);
        setErrorMessage("");
        setOpen(false);
      })
      .catch((error) => console.error("Axios error:", error));

    setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        onClick={() => setOpen(true)}
      >
        Add User
      </button>

      <UserTable 
        onDeleteUser={(id: number) => console.log(`Delete user with id: ${id}`)} 
        onAddUser={handleAddUser} 
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Add User" onSubmit={handleSubmit}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <TextField
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ marginBottom: 4 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!validationErrors.name}
          helperText={validationErrors.name}
        />
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 4 }}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Role"
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
          {validationErrors.role && <p style={{ color: 'red' }}>{validationErrors.role}</p>}
        </FormControl>
        <TextField
          fullWidth
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          sx={{ marginBottom: 4 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!validationErrors.email}
          helperText={validationErrors.email}
        />
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 4 }}>
          <InputLabel id="status-label">Status</InputLabel> {/* Update labelId */}
          <Select
            labelId="status-label"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Active">
              Active
            </MenuItem>
            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </Select>
          {validationErrors.status && <p style={{ color: 'red' }}>{validationErrors.status}</p>}
        </FormControl>
      </Modal>
    </div>
  );
}
