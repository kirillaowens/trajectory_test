import React, { useState } from "react";
import { CarType } from "../../types/types";
import { Box, Button } from "@mui/material";
import { CreateTextField } from "./style";

interface CarCreateModalProps {
  onClose: () => void;
  onCreate: (car: CarType) => void;
}

function CarCreateModal({ onClose, onCreate }: CarCreateModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    color: "",
    price: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreate = () => {
    if (
      !formData.name.trim() ||
      !formData.model.trim() ||
      !formData.year.trim() ||
      !formData.color.trim() ||
      !formData.price.trim()
    ) {
      alert("Заполните все обязательные поля");
      return;
    }

    const newCar: CarType = {
      id: Date.now(),
      name: formData.name,
      model: formData.model,
      year: Number(formData.year) || new Date().getFullYear(),
      color: formData.color,
      price: Number(formData.price),
      latitude: 55.75 + (Math.random() - 0.5) * 0.2,
      longitude: 37.62 + (Math.random() - 0.5) * 0.3, // это рандомные координаты москвы
    };

    onCreate(newCar);
    onClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "30vw",
        gap: 2,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 1,
      }}
    >
      <CreateTextField
        required
        label="Name"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      <CreateTextField
        required
        label="Model"
        placeholder="Model"
        value={formData.model}
        onChange={(e) => handleInputChange("model", e.target.value)}
      />
      <CreateTextField
        required
        type="number"
        label="Year"
        placeholder="Year"
        value={formData.year}
        onChange={(e) => handleInputChange("year", e.target.value)}
      />
      <CreateTextField
        required
        label="Color"
        placeholder="Color"
        value={formData.color}
        onChange={(e) => handleInputChange("color", e.target.value)}
      />
      <CreateTextField
        required
        type="number"
        label="Price"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => handleInputChange("price", e.target.value)}
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default CarCreateModal;
