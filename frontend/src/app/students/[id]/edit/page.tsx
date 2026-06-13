"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import Layout from "@/components/Layout";
import Loader from "@/components/loader";

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [prediction, setPrediction] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    department: "",
    level: "",
    attendance: "",
    assignmentScore: "",
    testScore: "",
    studyHours: "",
    caScore: "",
  });

  async function fetchStudent() {
    try {
      const response = await api.get(`/students/${params.id}`);

      const student = response.data.data;

      setFormData({
        studentId: student.studentId,
        name: student.name,
        department: student.department,
        level: student.level,
        attendance: student.attendance.toString(),
        assignmentScore: student.assignmentScore.toString(),
        testScore: student.testScore.toString(),
        studyHours: student.studyHours.toString(),
        caScore: student.caScore.toString(),
      });

      setPrediction(student.prediction || "");
    } catch (error) {
      console.error(error);
      alert("Failed to load student");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLevelChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      level: e.target.value,
    });
  };

  const handlePredict = async () => {
    try {
      const response = await api.post("/students/predict", {
        attendance: Number(formData.attendance),
        assignmentScore: Number(formData.assignmentScore),
        testScore: Number(formData.testScore),
        studyHours: Number(formData.studyHours),
        caScore: Number(formData.caScore),
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    try {
      let finalPrediction = prediction;

      if (!finalPrediction) {
        const predictionResponse = await api.post("/students/predict", {
          attendance: Number(formData.attendance),
          assignmentScore: Number(formData.assignmentScore),
          testScore: Number(formData.testScore),
          studyHours: Number(formData.studyHours),
          caScore: Number(formData.caScore),
        });

        finalPrediction = predictionResponse.data.prediction;
      }

      await api.put(`/students/${params.id}`, {
        ...formData,
        attendance: Number(formData.attendance),
        assignmentScore: Number(formData.assignmentScore),
        testScore: Number(formData.testScore),
        studyHours: Number(formData.studyHours),
        caScore: Number(formData.caScore),
        prediction: finalPrediction,
      });

      alert("Student updated successfully");

      router.push("/students");
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    } finally {
      setSaving(false);
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
      <div className="p-6">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Student</h1>

          <p className="text-gray-500 mt-1">
            Enter student information and predict academic performance.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Side */}

            <div className="xl:col-span-2 space-y-6">
              {/* Student Information */}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg text-gray-500 font-semibold mb-5">
                  Student Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID
                    </label>

                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="STU001"
                      className="w-full rounded-xl text-gray-400 border border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl text-gray-400 border border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>

                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Computer Science"
                      className="w-full rounded-xl text-gray-400 border border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Level
                    </label>

                    <select
                      value={formData.level}
                      onChange={handleLevelChange}
                      className="w-full rounded-xl text-gray-400 border border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="100">100 Level</option>
                      <option value="200">200 Level</option>
                      <option value="300">300 Level</option>
                      <option value="400">400 Level</option>
                      <option value="500">500 Level</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg text-gray-500 font-semibold mb-5">
                  Performance Metrics
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      label: "Attendance (%)",
                      name: "attendance",
                    },
                    {
                      label: "Assignment Score",
                      name: "assignmentScore",
                    },
                    {
                      label: "Test Score",
                      name: "testScore",
                    },
                    {
                      label: "Study Hours",
                      name: "studyHours",
                    },
                    {
                      label: "CA Score",
                      name: "caScore",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>

                      <input
                        type="number"
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full rounded-xl text-gray-400 border border-gray-500 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}

            <div className="space-y-6">
              {/* Prediction Card */}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 className="font-semibold text-gray-500 text-lg mb-4">
                  Prediction Result
                </h2>

                {prediction ? (
                  <div
                    className={`rounded-xl p-5 text-center ${
                      prediction === "Excellent"
                        ? "bg-green-50 text-2xl text-green-600 border border-green-200"
                        : prediction === "Average"
                          ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      Predicted Performance
                    </p>

                    <h3 className="text-2xl font-bold mt-2">{prediction}</h3>
                  </div>
                ) : (
                  <div className="rounded-xl bg-gray-50 p-5 text-center text-gray-500">
                    No prediction generated yet
                  </div>
                )}
              </div>

              {/* Actions */}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handlePredict}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-medium transition cursor-pointer"
                  >
                    Predict Performance
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition cursor-pointer"
                  >
                    {loading ? "Saving..." : "Save Student"}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/students")}
                    className="w-full border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
