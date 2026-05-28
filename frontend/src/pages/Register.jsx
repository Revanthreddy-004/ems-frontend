import { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          Register
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-4"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mb-4"
        >
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="HR">HR</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-3 rounded-lg"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;