import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";
import seedAdmin from "./seeders/adminSeeder";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
