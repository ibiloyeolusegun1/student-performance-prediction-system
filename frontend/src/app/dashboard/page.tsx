"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Layout from "@/components/Layout";
import Loader from "@/components/loader";

interface RecentStudent {
  _id: string;
  studentId: string;
  name: string;
  department: string;
  level: string;
  prediction: string;
}

interface DashboardData {
  totalStudents: number;
  excellentStudents: number;
  averageStudents: number;
  poorStudents: number;
  recentStudents: RecentStudent[];
}

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardData | null>(null);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get("/dashboard/stats");

      setStats(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard data");
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

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />;
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Student Performance Dashboard</h1>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/students")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Students
            </button>

            <button
              onClick={() => router.push("/reports")}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Reports
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500">Total Students</h3>
            <p className="text-3xl font-bold">{stats?.totalStudents}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500">Excellent Students</h3>
            <p className="text-3xl font-bold text-green-600">
              {stats?.excellentStudents}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500">Average Students</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {stats?.averageStudents}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-gray-500">Poor Students</h3>
            <p className="text-3xl font-bold text-red-600">
              {stats?.poorStudents}
            </p>
          </div>
        </div>

        {/* Recent Students */}

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-bold mb-4">Recent Students</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Student ID</th>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Department</th>
                  <th className="border p-3 text-left">Level</th>
                  <th className="border p-3 text-left">Prediction</th>
                </tr>
              </thead>

              <tbody>
                {stats?.recentStudents?.length ? (
                  stats.recentStudents.map((student) => (
                    <tr key={student._id}>
                      <td className="border p-3">{student.studentId}</td>

                      <td className="border p-3">{student.name}</td>

                      <td className="border p-3">{student.department}</td>

                      <td className="border p-3">{student.level}</td>

                      <td className="border p-3">
                        <span
                          className={`px-3 py-1 rounded text-white ${
                            student.prediction === "Excellent"
                              ? "bg-green-500"
                              : student.prediction === "Average"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {student.prediction}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="border p-4 text-center">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
