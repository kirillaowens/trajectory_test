import React from "react";
import { Box, Link } from "@mui/material";
import CarsList from "../../features/CarsList/CarsList";
import Map from "../../features/Map/Map";

function MainPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Link
        href="/"
        target="_self"
        underline="none"
        sx={{ marginLeft: "10vw", marginTop: "3vh" }}
      >
        <Box
          component="img"
          alt="Траектория глонасс мониторинг транспорта"
          src="https://glonassgps.biz/wp-content/uploads/2022/10/logo_trajectory.svg"
          sx={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: 10,
          margin: "5vh 10vw 10vw",
        }}
      >
        <CarsList />
        <Map />
      </Box>
    </Box>
  );
}

export default MainPage;
