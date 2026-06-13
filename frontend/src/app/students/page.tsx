"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Layout from "@/components/Layout";
import Loader from "@/components/loader";
import PredictionBadge from "@/components/PredictionBadge";

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

export default function StudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");

      setStudents(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchStudents();
  }, []);

  const deleteStudent = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/students/${id}`);

      setStudents((prev) => prev.filter((student) => student._id !== id));

      alert("Student deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  };

  const predictionBadge = (prediction: string) => {
    switch (prediction) {
      case "Excellent":
        return "bg-green-500";
      case "Average":
        return "bg-yellow-500";
      case "Poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />;
      </div>
    );
  }

  return (
    <Layout>
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Management</h1>

        <button
          onClick={() => router.push("/students/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      {/* Students Table */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Students</h2>

            <p className="text-sm text-gray-500">
              Manage and monitor student performance predictions
            </p>
          </div>

          <div className="mt-3 md:mt-0">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {students.length} Students
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Level
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Prediction
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    {/* Student */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {student.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Student Record
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Student ID */}

                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-700">
                        {student.studentId}
                      </span>
                    </td>

                    {/* Department */}

                    <td className="px-6 py-4 text-gray-700">
                      {student.department}
                    </td>

                    {/* Level */}

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        Level {student.level}
                      </span>
                    </td>

                    {/* Prediction */}

                    <td className="px-6 py-4">
                      <PredictionBadge prediction={student.prediction} />
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(`/students/${student._id}`)
                          }
                          className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium transition cursor-pointer"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            router.push(`/students/${student._id}/edit`)
                          }
                          className="px-3 py-2 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 font-medium transition cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteStudent(student._id)}
                          className="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
                        🎓
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-gray-900">
                        No Students Found
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Start by adding your first student record.
                      </p>

                      <button
                        onClick={() => router.push("/students/create")}
                        className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
                      >
                        Add Student
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
