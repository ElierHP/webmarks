import axios from "axios";
import { baseUrl } from "./index";

export const getNotes = async () => await axios.get(`${baseUrl}/notes`);
