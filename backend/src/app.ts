import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/student.routes";
import dashboardRoutes from "./routes/dashboard.routes";

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
app.use("/api/dashboard", dashboardRoutes);

export default app;
