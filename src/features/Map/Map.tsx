import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { YANDEX_API_KEY } from "../../app/config/api_key";
import { useCars } from "../../app/store/hooks/useCars";
import { Box } from "@mui/material";

function YandexMap() {
  const { cars } = useCars();
  return (
    <Box sx={{ border: "1px solid #3E7AA5" }}>
      <YMaps query={{ apikey: YANDEX_API_KEY }}>
        <Map
          defaultState={{ center: [59.95, 30.25], zoom: 10 }}
          width="45vw"
          height="60vh"
        >
          {cars.map((car) => (
            <Placemark
              key={car.id}
              modules={["geoObject.addon.balloon"]}
              defaultGeometry={[car.latitude, car.longitude]}
              properties={{
                balloonContentBody: `${car.name} - ${car.model}`,
              }}
            />
          ))}
        </Map>
      </YMaps>
    </Box>
  );
}

export default YandexMap;
