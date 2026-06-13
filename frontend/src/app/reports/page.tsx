"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Loader from "@/components/loader";

interface DashboardStats {
  totalStudents: number;
  excellentStudents: number;
  averageStudents: number;
  poorStudents: number;
}

export default function ReportsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats | null>(null);

  async function fetchReportData() {
    try {
      const response = await api.get("/dashboard/stats");

      setStats(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load reports");
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

    fetchReportData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />;
      </div>
    );
  }

  const pieData = [
    {
      name: "Excellent",
      value: stats?.excellentStudents || 0,
    },
    {
      name: "Average",
      value: stats?.averageStudents || 0,
    },
    {
      name: "Poor",
      value: stats?.poorStudents || 0,
    },
  ];

  const barData = [
    {
      category: "Excellent",
      count: stats?.excellentStudents || 0,
    },
    {
      category: "Average",
      count: stats?.averageStudents || 0,
    },
    {
      category: "Poor",
      count: stats?.poorStudents || 0,
    },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Performance Reports</h1>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Dashboard
          </button>
        </div>

        {/* Summary Cards */}

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

        {/* Charts */}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pie Chart */}

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 font-bold mb-4">Performance Distribution</h2>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={120} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl text-gray-800 font-bold mb-4">Performance Comparison</h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="category" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
