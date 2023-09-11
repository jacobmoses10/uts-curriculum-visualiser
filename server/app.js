import express from "express";
import cors from "cors";
import course from "./routes/course.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/course", course);

export default app;
