"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import RoleTable from "@/components/RoleTable";
import Modal from "@/components/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type Role = {
  id: number;
  name: string;
  permissions: string[];
};

const usePermissions = () => {
  const [permissions, setPermissions] = useState<string[]>([]);
  useEffect(() => {
    axios.get("/api/permissions", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => setPermissions(response.data))
      .catch((error) => console.error("Axios error:", error));
  }, []);
  return permissions;
};

const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const addRole = (role: Role) => setRoles((prevRoles) => [...prevRoles, role]);
  return { roles, addRole };
};

export default function RolesPage() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const permissions = usePermissions();
  const { roles, addRole } = useRoles();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedPermissions((prev) =>
      prev.includes(value)
        ? prev.filter((permission) => permission !== value)
        : [...prev, value]
    );
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event) event.preventDefault();
    const roleData = { name: role, permissions: selectedPermissions };
    axios.post("/api/roles", roleData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Role added:", response.data);
        addRole({ ...response.data, id: response.data.id });
        setOpen(false);
      })
      .catch((error) => console.error("Axios error:", error));
  };

  // const handleAddRole = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-6  min-h-screen">
       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
       <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Role Management</h1>
 
      <RoleTable roles={roles} />

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

      <Modal open={open} onClose={handleClose} title="Add Role" onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Role Name"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            margin="normal"
          />
          <label className="block mb-2">Select Permission</label>
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  value={permission}
                  checked={selectedPermissions.includes(permission)}
                  onChange={handleCheckboxChange}
                />
              }
              label={permission}
            />
          ))}
        </div>
      </Modal>
      
 
    </div>
    </div>
  );
}