import express from "express";
import mongoose from "mongoose";
import { dbUrl, PORT } from "./config.js";
import usersRoute from "./routes/usersRoute.js";
import imageRoutes from "./routes/imageRoutes.js";
import pfpRoutes from "./routes/pfpRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: true }));

app.use("/users", usersRoute);
app.use("/images", imageRoutes);
app.use("/", pfpRoutes);

app.get("/", async (req, res) => {
  return res.send({ message: "lol" });
});

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("database ok");
    app.listen(PORT, () => {
      console.log(`app is working on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
