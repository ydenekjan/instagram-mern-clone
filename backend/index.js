import express from "express";
import mongoose from "mongoose";
import usersRoute from "./routes/usersRoute.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
const app = express();
import dotEnv from "dotenv";
dotEnv.config();
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({ origin: true }));

app.use("/users", usersRoute);
app.use("/posts", postRoutes);

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("database ok");
    app.listen(PORT, () => {
      console.log(`app is working on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
