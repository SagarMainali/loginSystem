import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoute";
import makeConnection from "./database/connect";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

const MONGO_URI = 'mongodb://localhost:27017/userDb'

const start = async () => {
  await makeConnection(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();

