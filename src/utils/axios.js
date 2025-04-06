import axios from "axios";


const instance = axios.create({
  baseURL: "http://localhost:5001/",
  withCredentials: true, // ensures cookies are sent for auth
});

export default instance;
