"use client";

import React, { useState } from "react";
import PermissionTable from "@/components/PermissionTable";
import { Button, Modal, TextField, Box } from "@mui/material";
import axios from "axios";

export default function PermissionsPage() {
  const [open, setOpen] = useState(false);
  const [newPermission, setNewPermission] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleAddPermission = async () => {
    try {
      const response = await axios.post("/api/permissions", {
        permission: newPermission,
      });
      console.log("Permission added:", response.data);
      setOpen(false);
      setNewPermission("");
      setRefresh((prev) => !prev); // Trigger refresh
    } catch (error) {
      console.error("Error adding permission:", error);
    }
  };

  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Permission Management</h1>

        <PermissionTable refresh={refresh} />
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
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          onClick={() => setOpen(true)}
        >
          Add Permission
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <h2>Add New Permission</h2>
            <TextField
              fullWidth
              label="Permission"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPermission}
              sx={{ mt: 2 }}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
