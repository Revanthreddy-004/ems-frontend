import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

import DashboardCharts from "../components/DashboardCharts";

function Employees({ role }) {

  const [employees, setEmployees] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    salary: "",
    designation: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {

    try {

      setLoading(true);

      const response = await API.get("/employees");

      setEmployees(response.data);

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await API.put(
          `/employees/${editingId}`,
          formData
        );

        toast.success("Employee Updated");

        setEditingId(null);

      } else {

        await API.post(
          "/employees",
          formData
        );

        toast.success("Employee Added");
      }

      fetchEmployees();

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        salary: "",
        designation: ""
      });

    } catch (error) {

      console.error(error);

      toast.error("Operation Failed");
    }
  };

  const deleteEmployee = async (id) => {

    try {

      await API.delete(`/employees/${id}`);

      toast.success("Employee Deleted");

      fetchEmployees();

    } catch (error) {

      console.error(error);

      toast.error("Delete Failed");
    }
  };

  const editEmployee = (employee) => {

    setEditingId(employee.id);

    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      salary: employee.salary,
      designation: employee.designation
    });
  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Employee Management System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-gray-500">
            Total Employees
          </h2>

          <p className="text-3xl font-bold text-blue-600">
            {employees.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-gray-500">
            Developers
          </h2>

          <p className="text-3xl font-bold text-green-600">
            {
              employees.filter(
                emp => emp.designation === "Developer"
              ).length
            }
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-gray-500">
            Managers
          </h2>

          <p className="text-3xl font-bold text-yellow-600">
            {
              employees.filter(
                emp => emp.designation === "Manager"
              ).length
            }
          </p>

        </div>

      </div>

      {(role === "ADMIN" || role === "HR") && (

        <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto mb-10">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {editingId
                ? "Update Employee"
                : "Add Employee"}
            </button>

          </form>

        </div>

      )}

      <input
        type="text"
        placeholder="Search Employee"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg w-full mb-10"
      />

      {loading && (

        <h1 className="text-center text-2xl mb-10">
          Loading...
        </h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {employees

          .filter(emp =>
            emp.firstName
              .toLowerCase()
              .includes(search.toLowerCase())
          )

          .map(emp => (

            <div
              key={emp.id}
              className="bg-white p-6 rounded-xl shadow-md"
            >

              <h2 className="text-2xl font-bold text-gray-800">

                {emp.firstName} {emp.lastName}

              </h2>

              <p className="text-gray-600 mt-2">
                {emp.email}
              </p>

              <p className="text-gray-600">
                {emp.phone}
              </p>

              <p className="text-blue-600 font-semibold mt-2">
                {emp.designation}
              </p>

              <p className="text-green-600 font-bold">
                ₹ {emp.salary}
              </p>

              {(role === "ADMIN" || role === "HR") && (

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => editEmployee(emp)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              )}

            </div>
          ))}
      </div>

      <DashboardCharts employees={employees} />

    </div>
  );
}

export default Employees;