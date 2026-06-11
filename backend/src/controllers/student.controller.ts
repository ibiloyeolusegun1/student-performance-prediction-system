import { Request, Response } from "express";
import Student from "../models/Student";

export const createStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create student",
    });
  }
};

export const getStudents = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const students = await Student.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
    });
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update student",
    });
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};
