"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Layout from "@/components/Layout";
import Loader from "@/components/loader";
import StatCard from "@/components/StatCard";
import PredictionBadge from "@/components/PredictionBadge";

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
          <h1 className="text-3xl font-bold text-gray-800">
            Student Performance Dashboard
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/students")}
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Students
            </button>

            <button
              onClick={() => router.push("/reports")}
              className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Reports
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Students" value={stats?.totalStudents || 0} />

          <StatCard
            title="Excellent Students"
            value={stats?.excellentStudents || 0}
            color="text-green-600"
          />

          <StatCard
            title="Average Students"
            value={stats?.averageStudents || 0}
            color="text-yellow-600"
          />

          <StatCard
            title="Poor Students"
            value={stats?.poorStudents || 0}
            color="text-red-600"
          />
        </div>

        {/* Recent Students */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Students
              </h2>
              <p className="text-sm text-gray-500">
                Latest student performance records
              </p>
            </div>

            <button
              onClick={() => router.push("/students")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              View All →
            </button>
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
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {stats?.recentStudents?.length ? (
                  stats.recentStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      {/* Student Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                            {student.name
                              ?.split(" ")
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                          📚
                        </div>

                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                          No Students Found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Students will appear here once they are added.
                        </p>

                        <button
                          onClick={() => router.push("/students/create")}
                          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
      </div>
    </Layout>
  );
}
