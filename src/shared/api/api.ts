import axios from "axios";
import { API_KEY } from "../../app/config/api_key";

export type CarType = {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
};

export const getCars = async (): Promise<CarType[]> => {
  const { data } = await axios.get<CarType[]>(`${API_KEY}`);
  return data;
};
