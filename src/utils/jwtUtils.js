

import { jwtDecode } from "jwt-decode"; 

export const decodeJWT = (token) => {
  try {
    return jwtDecode(token); // Use the correct function name
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
};
