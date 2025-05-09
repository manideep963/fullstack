import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", imageURL: "", courseId: null });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("admin_token");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/course/bulk", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = form.courseId ? "/admin/course" : "/admin/course";
    const method = form.courseId ? "put" : "post";

    try {
      await axios({
        method,
        url: `http://localhost:3000${url}`,
        headers: { Authorization: `Bearer ${token}` },
        data: form
      });
      setMessage(form.courseId ? "Updated Successfully" : "Course Created");
      setForm({ title: "", description: "", price: "", imageURL: "", courseId: null });
      fetchCourses();
    } catch (err) {
      console.error("Failed to submit", err);
    }
  };

  const handleEdit = (course) => {
    setForm({ ...course, courseId: course._id });
    
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Courses</h1>
      {message && <p className="text-green-600">{message}</p>}

      <div className="grid gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2" />
        <input name="imageURL" value={form.imageURL} onChange={handleChange} placeholder="Image URL" className="border p-2" />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          {form.courseId ? "Update Course" : "Add Course"}
        </button>
      </div>

      <hr className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="border p-4 rounded shadow">
            <img src={course.imageURL} alt={course.title} className="w-full h-40 object-cover rounded" />
            <h2 className="font-bold text-lg mt-2">{course.title}</h2>
            <p>{course.description}</p>
            <p className="font-semibold mt-1">₹{course.price}</p>
            <button onClick={() => handleEdit(course)} className="mt-2 text-blue-600 underline">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
