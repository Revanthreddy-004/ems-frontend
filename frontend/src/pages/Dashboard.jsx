import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

import Employees from "./Employees";

function Dashboard() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem("token");

  const decoded = jwtDecode(token);

  const role = decoded.role;

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div
      className={
        darkMode
          ? "min-h-screen bg-black text-white"
          : "min-h-screen bg-gray-100"
      }
    >

      <nav className="bg-blue-600 text-white p-5 flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold">
            EMS Dashboard
          </h1>

          <p className="text-sm">
            Logged in as: {role}
          </p>

        </div>

        <div className="flex items-center gap-4">

          <div className="text-right">

            <p className="font-bold">
              {decoded.sub}
            </p>

            <p className="text-sm">
              {role}
            </p>

          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Toggle Theme
          </button>

          <button
            onClick={logout}
            className="bg-red-500 px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </nav>

      <Employees role={role} />

    </div>
  );
}

export default Dashboard;