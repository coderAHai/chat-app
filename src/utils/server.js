import axios from "axios";
import { HOST } from "./constants";
import { toast } from "sonner";

const server = axios.create({
  baseURL: HOST,
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error(error.response.data);
  }
);

export default server;
