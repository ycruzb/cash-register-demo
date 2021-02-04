import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const dataPie = [
    {
      name: "Store 1",
      purchase: 4000,
      sold: 2400,
    },
    {
      name: "Store 2",
      purchase: 3000,
      sold: 1398,
    },
    {
      name: "Store 3",
      purchase: 2000,
      sold: 9800,
    },
    {
      name: "Store 4",
      purchase: 2780,
      sold: 3908,
    },
  ];

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="purchase" fill="#dc2626" />
        <Bar dataKey="sold" fill="#059668" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
