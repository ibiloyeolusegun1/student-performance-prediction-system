"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [prediction, setPrediction] =
    useState("");

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
      const response = await api.get(
        `/students/${params.id}`
      );

      const student = response.data.data;

      setFormData({
        studentId: student.studentId,
        name: student.name,
        department: student.department,
        level: student.level,
        attendance:
          student.attendance.toString(),
        assignmentScore:
          student.assignmentScore.toString(),
        testScore:
          student.testScore.toString(),
        studyHours:
          student.studyHours.toString(),
        caScore:
          student.caScore.toString(),
      });

      setPrediction(
        student.prediction || ""
      );
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    try {
      const response = await api.post(
        "/students/predict",
        {
          attendance: Number(
            formData.attendance
          ),
          assignmentScore: Number(
            formData.assignmentScore
          ),
          testScore: Number(
            formData.testScore
          ),
          studyHours: Number(
            formData.studyHours
          ),
          caScore: Number(
            formData.caScore
          ),
        }
      );

      setPrediction(
        response.data.prediction
      );
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      let finalPrediction = prediction;

      if (!finalPrediction) {
        const predictionResponse =
          await api.post(
            "/students/predict",
            {
              attendance: Number(
                formData.attendance
              ),
              assignmentScore: Number(
                formData.assignmentScore
              ),
              testScore: Number(
                formData.testScore
              ),
              studyHours: Number(
                formData.studyHours
              ),
              caScore: Number(
                formData.caScore
              ),
            }
          );

        finalPrediction =
          predictionResponse.data.prediction;
      }

      await api.put(
        `/students/${params.id}`,
        {
          ...formData,
          attendance: Number(
            formData.attendance
          ),
          assignmentScore: Number(
            formData.assignmentScore
          ),
          testScore: Number(
            formData.testScore
          ),
          studyHours: Number(
            formData.studyHours
          ),
          caScore: Number(
            formData.caScore
          ),
          prediction: finalPrediction,
        }
      );

      alert(
        "Student updated successfully"
      );

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
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">
          Edit Student
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {Object.entries(formData).map(
            ([key, value]) => (
              <input
                key={key}
                type={
                  key.includes("Score") ||
                  key === "attendance" ||
                  key === "studyHours"
                    ? "number"
                    : "text"
                }
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={key}
                className="w-full border p-3 rounded"
              />
            )
          )}

          {prediction && (
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-bold">
                Prediction:
              </h3>

              <p className="text-xl">
                {prediction}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handlePredict}
              className="bg-yellow-500 text-white px-5 py-3 rounded"
            >
              Recalculate Prediction
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-5 py-3 rounded"
            >
              {saving
                ? "Updating..."
                : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}