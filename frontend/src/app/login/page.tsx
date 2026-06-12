"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      router.push("/dashboard");
    } catch (error) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md border p-6 rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="border w-full p-3 mb-4"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-black text-white p-3 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}