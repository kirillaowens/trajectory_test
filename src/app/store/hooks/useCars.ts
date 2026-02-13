import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../../shared/api/api";
import {
  setCars,
  removeCar,
  createCar,
  editCar,
  setSortBy,
} from "../slice/carsSlice";
import type { RootState, AppDispatch } from "../store";
import type { CarType } from "../../../types/types";

export const useCars = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.cars.items);
  const sortBy = useSelector((state: RootState) => state.cars.sortBy);

  const {
    data: serverCars = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  useEffect(() => {
    if (serverCars.length > 0) {
      dispatch(setCars(serverCars));
    }
  }, [serverCars, dispatch]);

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

  const handleRemoveCar = (id: number) => {
    dispatch(removeCar(id));
  };

  const handleCreateCar = (car: CarType) => {
    dispatch(createCar(car));
  };

  const handleEditCar = (id: number, updates: Partial<CarType>) => {
    dispatch(editCar({ id, updates }));
  };

  const handleSetSortBy = (
    sort: "none" | "year-asc" | "year-desc" | "price-asc" | "price-desc",
  ) => {
    dispatch(setSortBy(sort));
  };

  return {
    cars: sortedCars,
    sortBy,
    isLoading,
    error,
    removeCar: handleRemoveCar,
    createCar: handleCreateCar,
    editCar: handleEditCar,
    setSortBy: handleSetSortBy,
  };
};
