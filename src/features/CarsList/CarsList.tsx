import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../shared/api/api";

function CarsList() {
  const {
    data: cars = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: [""],
    queryFn: getCars,
  });

  return (
    <div>
      {isPending && <div>Загрузка...</div>}
      {isError && <div>Ошибка</div>}
      {cars.map((car) => (
        <div key={car.id}>
          <p>{car.name}</p>
          <p>{car.model}</p>
          <p>{car.year}</p>
          <p>{car.price}</p>
        </div>
      ))}
    </div>
  );
}

export default CarsList;
