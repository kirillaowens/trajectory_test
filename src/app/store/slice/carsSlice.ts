import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarType } from "../../../types/types";

interface CarsState {
  items: CarType[];
  sortBy: "none" | "year-asc" | "year-desc" | "price-asc" | "price-desc";
}

const initialState: CarsState = {
  items: [],
  sortBy: "none",
};
const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.items = action.payload;
    },
    removeCar: (state, action) => {
      state.items = state.items.filter((car) => car.id !== action.payload);
    },
    createCar: (state, action: PayloadAction<CarType>) => {
      state.items = [...state.items, action.payload];
    },
    editCar: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<CarType> }>,
    ) => {
      const index = state.items.findIndex(
        (car) => car.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
    setSortBy: (state, action: PayloadAction<CarsState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setCars, removeCar, createCar, editCar, setSortBy } =
  carsSlice.actions;
export default carsSlice.reducer;
