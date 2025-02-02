import axios from "axios";
import { AXIOS_CONFIG } from "./config";

const serverAxios = axios.create(AXIOS_CONFIG);

export default serverAxios;
