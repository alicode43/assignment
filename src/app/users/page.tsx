"use client"
import React, { useState, useEffect } from "react";
import UserTable from "@/components/UserTable";
import Modal from "@/components/Modal";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material"; 
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
 
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
 

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

 
  const handleAddUser = (newUser: User) => {
    console.log("User added:", newUser);
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
    <div className="p-6  min-h-screen">
    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
    <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Users</h1>



      <UserTable 
        onDeleteUser={(id: number) => console.log(`Delete user with id: ${id}`)} 
        onAddUser={handleAddUser} 
      />
            <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
          margin: 4,
          width: '60%',
          display: 'block', // Center the button
          marginLeft: 'auto', // Center the button
          marginRight: 'auto', // Center the button
        }}
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>
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
    </div>
  );
}
