// src/pages/CoursePreview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CoursePreview = () => {
  const [courses, setCourses] = useState([]);
  const [purchasing, setPurchasing] = useState(null);
  const [message, setMessage] = useState("");

 useEffect(() => {
  const token = localStorage.getItem("user_token");
  axios.get("https://backend-4zts.onrender.com/course/preview", {
    
  })
    .then(res => setCourses(res.data.courses))
    .catch(err => console.error("Failed to fetch courses", err));
}, []);

  const handlePurchase = async (courseId) => {
    setPurchasing(courseId);
    try {
      const token = localStorage.getItem("user_token");
      const res = await axios.post(
        "https://backend-4zts.onrender.com/purchase",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error("Purchase failed", err);
      setMessage("Failed to purchase course");
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
      {message && <div className="text-green-600 font-semibold">{message}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="border p-4 rounded-xl shadow-md">
            <img src={course.imageURL} alt={course.title} className="w-full h-40 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{course.title}</h2>
            <p className="text-gray-600">{course.desc}</p>
            <p className="font-bold mt-2">₹{course.price}</p>
            <button
              onClick={() => handlePurchase(course._id)}
              disabled={purchasing === course._id}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {purchasing === course._id ? "Processing..." : "Purchase"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePreview;
