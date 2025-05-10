import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://backend-4zts.onrender.com/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMyCourses(res.data.courses);
      } catch (err) {
        console.error("Failed to fetch purchased courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Purchased Courses</h1>

      {loading ? (
        <p>Loading your courses...</p>
      ) : myCourses.length === 0 ? (
        <p className="text-gray-600">You haven't purchased any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map(course => (
            <div key={course._id} className="border p-4 rounded-xl shadow-md">
              <img src={course.imageURL} alt={course.title} className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{course.title}</h2>
              <p className="text-gray-600">{course.desc}</p>
              <p className="font-bold mt-2">₹{course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
