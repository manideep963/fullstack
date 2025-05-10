import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AuthForm({ mode, role }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const isSignup = mode === "signup";
  const baseURL = "https://backend-4zts.onrender.com"; 
  const endpoint = `${baseURL}/${role}/${mode}`;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const sendData = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    const res = await axios.post(endpoint, sendData);
    alert(res.data.message || "Success");

    if (res.data.token) {
      localStorage.setItem(`${role}_token`, res.data.token);
      if (role === "user") {
  navigate("/courses");
} else if (role === "admin") {
  navigate("/create");
}

      
    }
  } catch (err) {
  console.error("Full error object:", err); // Log the full error
  console.error("Error response:", err.response || "No response received"); // Log response safely
  alert(err.response?.data?.message || "Error occurred");
}

};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
    >
      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {isSignup && (
          <>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="w-full p-2 border rounded"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="w-full p-2 border rounded"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-opacity-80"
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  );
}
