"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import Layout from "@/components/Layout";
import Loader from "@/components/loader";

interface Student {
  _id: string;
  studentId: string;
  name: string;
  department: string;
  level: string;
  attendance: number;
  assignmentScore: number;
  testScore: number;
  studyHours: number;
  caScore: number;
  prediction: string;
}

export default function StudentDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);

  async function fetchStudent() {
    try {
      const response = await api.get(`/students/${params.id}`);

      setStudent(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load student");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchStudent();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />;
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen">
        Student not found
      </div>
    );
  }

  const predictionColor =
    student.prediction === "Excellent"
      ? "bg-green-500"
      : student.prediction === "Average"
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          {/* Header */}

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Student Details</h1>

            <button
              onClick={() => router.push("/students")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>

          {/* Student Information */}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-500">Student ID</h3>

              <p className="text-lg">{student.studentId}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">Name</h3>

              <p className="text-lg">{student.name}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">Department</h3>

              <p className="text-lg">{student.department}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">Level</h3>

              <p className="text-lg">{student.level}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">Attendance</h3>

              <p className="text-lg">{student.attendance}%</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">Assignment Score</h3>

              <p className="text-lg">{student.assignmentScore}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">Test Score</h3>

              <p className="text-lg">{student.testScore}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">Study Hours</h3>

              <p className="text-lg">{student.studyHours}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">CA Score</h3>

              <p className="text-lg">{student.caScore}</p>
            </div>
          </div>

          {/* Prediction Result */}

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Performance Prediction</h2>

            <div
              className={`${predictionColor} text-white px-6 py-4 rounded-lg text-xl font-bold inline-block`}
            >
              {student.prediction}
            </div>
          </div>

          {/* Summary */}

          <div className="mt-8 bg-gray-50 p-5 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Performance Summary</h2>

            <p>
              Based on attendance, assignments, tests, study hours, and CA
              score, the machine learning model predicts that this student&apos;
              performance is:
            </p>

            <p className="text-2xl font-bold mt-3">{student.prediction}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
