import { useState } from "react";
import AuthForm from "../../react/src/components/AuthForm.jsx";
// import { useNavigate } from "react-router-dom";

export default function UserAuthPage() {
   
  const [mode, setMode] = useState("signin");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">User Authentication</h2>
      <div className="mb-4 space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            mode === "signin" ? "bg-blue-600 text-white" : "bg-blue-200"
          }`}
          onClick={() => {setMode("signin");
          }}
        >
          Sign In
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "signup" ? "bg-blue-600 text-white" : "bg-blue-200"
          }`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>
      <AuthForm mode={mode} role="user" />
    </div>
  );
}
