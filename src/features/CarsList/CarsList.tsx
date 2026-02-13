import React, { useState, useMemo } from "react";
import { useCars } from "../../app/store/hooks/useCars";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CarsListPanel from "../CarsListPanel/CarsListPanel";
import CarEditModal from "../CarEdit/CarEditModal";
import { CarType } from "../../types/types";

type SortOption =
  | "none"
  | "year-asc"
  | "year-desc"
  | "price-asc"
  | "price-desc";

function CarsList() {
  const { cars, isLoading, removeCar, editCar } = useCars();
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("none");
  editingCar ? console.log("da") : console.log("net");
  const handleEdit = (id: number, updates: Partial<CarType>) => {
    editCar(id, updates);
    setEditingCar(null);
  };

  const sortedCars = useMemo(() => {
    if (sortBy === "none") return cars;

    return [...cars].sort((a, b) => {
      switch (sortBy) {
        case "year-asc":
          return a.year - b.year;
        case "year-desc":
          return b.year - a.year;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [cars, sortBy]);

  return (
    <Box
      sx={{
        height: "60vh",
        width: "50vw",
        overflowY: "auto",
        border: "1px solid #3E7AA5",
        borderRadius: 1,
      }}
    >
      <CarsListPanel sortBy={sortBy} onSortChange={setSortBy} />

      {isLoading && (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography>Загрузка...</Typography>
        </Box>
      )}

      {!isLoading && sortedCars.length === 0 && (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography color="text.secondary">Список машин пуст</Typography>
        </Box>
      )}

      {sortedCars.map((car) => (
        <Paper
          key={car.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            m: 1,
            gap: 2,
          }}
          elevation={1}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">
              {car.name} - {car.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {car.year}, {car.color}, ${car.price}
            </Typography>
          </Box>
          <Box>
            <IconButton aria-label="edit" onClick={() => setEditingCar(car)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => removeCar(car.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
      {editingCar && (
        <CarEditModal
          open={!!editingCar}
          car={editingCar}
          onClose={() => setEditingCar(null)}
          onEdit={handleEdit}
        />
      )}
    </Box>
  );
}

export default CarsList;
