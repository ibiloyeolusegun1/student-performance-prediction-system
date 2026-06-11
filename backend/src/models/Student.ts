import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  studentId: string;
  name: string;
  department: string;
  level: string;
  attendance: number;
  assignmentScore: number;
  testScore: number;
  studyHours: number;
  caScore: number;
  prediction?: string;
}

const studentSchema = new Schema<IStudent>(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      trim: true,
    },
    attendance: {
      type: Number,
      required: true,
    },
    assignmentScore: {
      type: Number,
      required: true,
    },
    testScore: {
      type: Number,
      required: true,
    },
    studyHours: {
      type: Number,
      required: true,
    },
    caScore: {
      type: Number,
      required: true,
    },
    prediction: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
