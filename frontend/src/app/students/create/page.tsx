"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Layout from "@/components/Layout";

export default function CreateStudentPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

    setLoading(true);

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

      await api.post("/students", {
        ...formData,
        attendance: Number(formData.attendance),
        assignmentScore: Number(formData.assignmentScore),
        testScore: Number(formData.testScore),
        studyHours: Number(formData.studyHours),
        caScore: Number(formData.caScore),
        prediction: finalPrediction,
      });

      alert("Student created successfully");

      router.push("/students");
    } catch (error) {
      console.error(error);
      alert("Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Add Student</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="level"
              placeholder="Level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="attendance"
              placeholder="Attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="assignmentScore"
              placeholder="Assignment Score"
              value={formData.assignmentScore}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="testScore"
              placeholder="Test Score"
              value={formData.testScore}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="studyHours"
              placeholder="Study Hours"
              value={formData.studyHours}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="caScore"
              placeholder="CA Score"
              value={formData.caScore}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            {prediction && (
              <div className="bg-blue-100 border border-blue-300 p-4 rounded">
                <h3 className="font-semibold">Predicted Performance:</h3>

                <p className="text-xl font-bold mt-2">{prediction}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handlePredict}
                className="bg-yellow-500 text-white px-6 py-3 rounded"
              >
                Predict Performance
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded"
              >
                {loading ? "Saving..." : "Save Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
