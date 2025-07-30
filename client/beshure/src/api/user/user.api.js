import { withErrorHandler } from "../../utils/apiWrapper";
import axiosInstance from "../azure.js";

// send registratioin request to the server

export const registerUser = withErrorHandler(
  async (fullname, password) => {
    let response = await axiosInstance.post("/users/new-user", {
      fullname,
      password,
    });
    
    // Return the data part of the response for successful requests
    return response.data;
  }
);

export const loginUser = withErrorHandler(
  async (username, password) => {
    let response = await axiosInstance.post("/users/login", {
      name:username,
      password,
    });

    return response.data;
  }
);
