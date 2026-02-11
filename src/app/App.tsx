import React from "react";
import CarsList from "../features/CarsList/CarsList";
import Map from "../features/Map/Map";
import { QueryProvider } from "./providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <CarsList />
      <Map />
    </QueryProvider>
  );
}

export default App;
