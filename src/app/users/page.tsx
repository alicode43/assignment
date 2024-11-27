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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

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
        />
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 4 }}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
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
        </FormControl>
        <TextField
          fullWidth
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          sx={{ marginBottom: 4 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 4 }}>
          <InputLabel id="status-label">Status</InputLabel> {/* Update labelId */}
          <Select
            labelId="status-label"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">
              <em>Select a Status</em>
            </MenuItem>
            <MenuItem value="Active">
              Active
            </MenuItem>
            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </Select>
        </FormControl>
      </Modal>
    </div>
  );
}
