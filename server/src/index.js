import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import initRouter from "./router/index.router.js";
import createError from "http-errors";
import { connect } from "./config/database.config.js";
import { checkStatusOrder } from "./config/checkStatusOrder.js";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// connect db
connect();

// using middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init router
initRouter(app);

// middleware handle error
// router not found
app.use((req, res, next) => {
  next(createError.NotFound("not found!"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      status: err.status || 500,
      message: err.message || "internal server",
    },
    data: err?.response?.data?.message || null,
  });
});

checkStatusOrder();
// listen
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
