

import { jwtDecode } from "jwt-decode"; 

export const decodeJWT = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
};
