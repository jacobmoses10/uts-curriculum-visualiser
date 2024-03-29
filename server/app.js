import express from "express";
import cors from "cors";
import course from "./routes/course.js";
import spk from "./routes/spk.js";
import subject from "./routes/subject.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/course", course);
app.use("/spk", spk);
app.use("/subject", subject);

export default app;
