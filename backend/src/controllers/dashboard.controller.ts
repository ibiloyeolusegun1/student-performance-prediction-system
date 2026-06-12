import { Request, Response } from "express";
import Student from "../models/Student";

export const getDashboardStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const totalStudents = await Student.countDocuments();

    const excellentStudents = await Student.countDocuments({
      prediction: "Excellent",
    });

    const averageStudents = await Student.countDocuments({
      prediction: "Average",
    });

    const poorStudents = await Student.countDocuments({
      prediction: "Poor",
    });

    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("studentId name department level prediction createdAt");

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        excellentStudents,
        averageStudents,
        poorStudents,
        recentStudents,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};
