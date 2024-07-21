import axios from "axios";
import { HOST } from "./constants";

const server = axios.create({
  baseURL: HOST,
});

export default server;
