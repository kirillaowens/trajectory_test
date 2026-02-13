// app/store/hooks/useCars.ts
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
import type { RootState } from "../store";
import type { CarType } from "../../../types/types";

export const useCars = () => {
  const dispatch = useDispatch();
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

  return {
    cars: sortedCars,
    sortBy,
    isLoading,
    error,
    removeCar: (id: number) => dispatch(removeCar(id)),
    createCar: (car: CarType) => dispatch(createCar(car)),
    editCar: (id: number, updates: Partial<CarType>) =>
      dispatch(editCar({ id, updates })),
    setSortBy: (
      sort: "none" | "year-asc" | "year-desc" | "price-asc" | "price-desc",
    ) => dispatch(setSortBy(sort)),
  };
};
