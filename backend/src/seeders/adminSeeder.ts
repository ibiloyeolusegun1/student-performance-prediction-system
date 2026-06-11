import bcrypt from "bcryptjs";
import User from "../models/User";


const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("Admin account created");
  } catch (error) {
    console.error(error);
  }
};

export default seedAdmin;
