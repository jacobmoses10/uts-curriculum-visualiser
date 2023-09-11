import express from "express";
import cors from "cors";
import data from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/data", data);

export default app;
