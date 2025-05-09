import { useNavigate } from "react-router-dom";

export default function RoleSelector() {
  const navigate = useNavigate();

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100">
      <h1 className="text-2xl font-bold">Who are you?</h1>
      <div className="flex gap-6">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600"
          onClick={() => navigate("/user")}
        >
          I'm a User
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600"
          onClick={() => navigate("/admin")}
        >
          I'm an Admin
        </button>
      </div>
    </div>
    </>
  );
}
