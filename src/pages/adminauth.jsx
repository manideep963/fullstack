import { useState } from "react";
import AuthForm from "../components/AuthForm"; 

export default function AdminAuthPage() {
  const [mode, setMode] = useState("signin");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Admin Authentication</h2>
      <div className="mb-4 space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            mode === "signin" ? "bg-green-600 text-white" : "bg-green-200"
          }`}
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "signup" ? "bg-green-600 text-white" : "bg-green-200"
          }`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>
      <AuthForm mode={mode} role="admin" />
    </div>
  );
}
