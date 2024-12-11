import axios from "axios";
import { HOST } from "@/utils/constants.js";

export const api = axios.create ({
    baseURL:HOST,
});

