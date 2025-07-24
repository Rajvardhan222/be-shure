import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = new express();
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
app.use(cors({
    origin: "http://localhost:8002",
    credentials:true,
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

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/shops", shopRouter);
app.use("/api/v1/products", productRouter);


export {app}