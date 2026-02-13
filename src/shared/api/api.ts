import axios from "axios";
import { API_KEY } from "../../app/config/api_key";
import { CarType } from "../../types/types";

export const getCars = async (): Promise<CarType[]> => {
  const { data } = await axios.get<CarType[]>(`${API_KEY}`);
  return data;
};
