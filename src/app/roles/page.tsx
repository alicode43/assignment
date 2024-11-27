"use client";

import React, { useState } from "react";
import axios from "axios";
import RoleTable from "@/components/RoleTable";
import Modal from "@/components/Modal";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type Role = {
  id: number;
  name: string;
  permissions: string[];
};

export default function RolesPage() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const addRoleToTable = (role: Role) => {
    setRoles((prevRoles) => {
      return [...prevRoles, { ...role }];
    });
  };

  const handleAddRole = () => {
    setOpen(true);
    axios.get("/api/permissions", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => setPermissions(response.data))
      .catch((error) => console.error("Axios error:", error));
  };

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

    const roleData = {
      name: role,
      permissions: selectedPermissions,
    };
    axios.post("/api/roles", roleData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Role added:", response.data);
        addRoleToTable({ ...response.data, id: response.data.id }); 
        setOpen(false);
       
      })
      .catch((error) => console.error("Axios error:", error));
    
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleAddRole}
      >
        Add Role
      </button>
      <RoleTable roles={roles} />
      <Modal open={open} onClose={handleClose} title="Add Role" onSubmit={handleSubmit} >
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
  );
}