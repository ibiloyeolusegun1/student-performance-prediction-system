"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Student ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Level</th>
              <th className="p-3 text-left">Prediction</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="p-3">{student.studentId}</td>

                  <td className="p-3">{student.name}</td>

                  <td className="p-3">{student.department}</td>

                  <td className="p-3">{student.level}</td>

                  <td className="p-3">
                    <span
                      className={`text-white px-3 py-1 rounded ${predictionBadge(
                        student.prediction,
                      )}`}
                    >
                      {student.prediction}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => router.push(`/students/${student._id}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/students/${student._id}/edit`)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-6">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
