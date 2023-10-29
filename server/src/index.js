import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import initRouter from "./router/index.router.js";
import createError from "http-errors";
import { connect } from "./config/database.config.js";
import { connectRedis } from "./config/redis.config.js";

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
//conect redis
// connectRedis();
// using middlewares
app.use(
  cors({
    origin: [
      process.env.FE_URL,
      process.env.MOMO_URL,
      "http://localhost:3000",
      "http://192.168.1.10:3000",
    ],
    credentials: true,
  })
);
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
    data: null,
  });
});
const userRooms = {};
// socket
io.on("connection", (socket) => {
  socket.on("joinRoom", (roomName, userId, role) => {
    socket.join(roomName);
    userRooms[socket.id] = { roomName, userId, role };
  });

  socket.on("sendNotification", (data) => {
    const { roomName, role } = userRooms[socket.id];
    if (role === "customer") {
      io.to(roomName).emit("notification", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete userRooms[socket.id];
  });
});

// listen
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
