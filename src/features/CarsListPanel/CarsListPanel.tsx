import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CarType } from "../../types/types";
import { useCars } from "../../app/store/hooks/useCars";
import CarCreateModal from "../CarCreate/CarCreateModal";

type SortOption =
  | "none"
  | "year-asc"
  | "year-desc"
  | "price-asc"
  | "price-desc";

interface CarsListPanelProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

function CarsListPanel({ sortBy, onSortChange }: CarsListPanelProps) {
  const [open, setOpen] = useState(false);
  const { createCar } = useCars();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = (car: CarType) => {
    createCar(car);
    handleClose();
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value as SortOption);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#447ba2ff",
        height: "fit-content",
        zIndex: 10,
        p: 1,
        gap: 1,
      }}
    >
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ bgcolor: "white", color: "#3E7AA5", textTransform: "none" }}
      >
        Создать машину
      </Button>

      <Select
        value={sortBy}
        onChange={handleSortChange}
        displayEmpty
        size="small"
        sx={{
          bgcolor: "white",
          color: "#3E7AA5",
          minWidth: 200,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
      >
        <MenuItem value="none">Без сортировки</MenuItem>
        <MenuItem value="year-asc">Год: сначала старые</MenuItem>
        <MenuItem value="year-desc">Год: сначала новые</MenuItem>
        <MenuItem value="price-asc">Цена: по возрастанию</MenuItem>
        <MenuItem value="price-desc">Цена: по убыванию</MenuItem>
      </Select>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-car-modal"
      >
        <CarCreateModal onClose={handleClose} onCreate={handleCreate} />
      </Modal>
    </Box>
  );
}

export default CarsListPanel;
