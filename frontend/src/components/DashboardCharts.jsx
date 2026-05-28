import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function DashboardCharts({ employees }) {

  const data = [

    {
      name: "Employees",
      count: employees.length
    },

    {
      name: "Developers",
      count: employees.filter(
        emp => emp.designation === "Developer"
      ).length
    },

    {
      name: "Managers",
      count: employees.filter(
        emp => emp.designation === "Manager"
      ).length
    }
  ];

  return (

    <div className="bg-white p-6 rounded-xl shadow-md mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Employee Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#2563eb" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default DashboardCharts;