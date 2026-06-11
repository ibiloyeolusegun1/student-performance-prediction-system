import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/student.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Student Performance Prediction API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

export default app;
