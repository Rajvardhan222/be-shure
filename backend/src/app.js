import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = new express();
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
app.use(cors({
    origin: "*",
    credentials:false,
}))

app.use(express.json(
    {
        limit:"16kb"
    }
))

app.use(express.urlencoded({
    extended:true,limit:"16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())


//routes import

import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shops.routes.js";
import productRouter from "./routes/products.routes.js";
import { ApiError } from "./utils/ApiError.js";

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/shops", shopRouter);
app.use("/api/v1/products", productRouter);

// Error handler (must have 4 args!)
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
      stack: err.stack,
    });
  }

  // Default fallback for other errors
  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: err.stack,
  });
});

export {app}