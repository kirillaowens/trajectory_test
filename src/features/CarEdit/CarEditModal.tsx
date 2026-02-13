import React, { useState } from "react";
import { CarType } from "../../types/types";
import { Box, Button, Modal } from "@mui/material";
import { CreateTextField } from "../CarCreate/style";

interface CarEditModalProps {
  open: boolean;
  car: CarType;
  onClose: () => void;
  onEdit: (id: number, updates: Partial<CarType>) => void;
}

function CarEditModal({ open, car, onClose, onEdit }: CarEditModalProps) {
  const [formData, setFormData] = useState({
    name: car.name,
    model: car.model,
    price: String(car.price),
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.model.trim() || !formData.price) {
      alert("Заполните все поля");
      return;
    }

    onEdit(car.id, {
      name: formData.name.trim(),
      model: formData.model.trim(),
      price: Number(formData.price),
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30vw",
          minWidth: "400px",
          gap: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <CreateTextField
          required
          label="Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <CreateTextField
          required
          label="Model"
          value={formData.model}
          onChange={(e) => handleInputChange("model", e.target.value)}
        />
        <CreateTextField
          required
          type="number"
          label="Price"
          value={formData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CarEditModal;
