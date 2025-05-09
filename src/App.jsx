import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import RoleSelector from './Selection';
import UserAuthPage from './pages/userauth';
import AdminAuthPage from './pages/adminauth';
import CoursePreview from "./pages/CoursePreview";
import MyCourses from "./pages/MyCourses";
import AdminCourses from "./pages/Create";

function App() {
  // const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/user/*" element={<UserAuthPage />} />
        <Route path="/admin/*" element={<AdminAuthPage />} />
        <Route path="/courses" element={ <CoursePreview />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/create" element={<AdminCourses/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
