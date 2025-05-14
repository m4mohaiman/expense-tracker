import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

 function IncomeExpenseLineChart({ incomes, expenses }) {
  // Combine and group data by date
  const combinedData = {};

  incomes.forEach((inc) => {
    const date = inc.date;
    combinedData[date] = {
      ...combinedData[date],
      date,
      income: (combinedData[date]?.income || 0) + Number(inc.amount || 0),
    };
  });

  expenses.forEach((exp) => {
    const date = exp.date;
    combinedData[date] = {
      ...combinedData[date],
      date,
      expense: (combinedData[date]?.expense || 0) + Number(exp.total || 0),
    };
  });

  const chartData = Object.values(combinedData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="w-full h-64 bg-base-100 rounded-xl shadow-md p-4 my-6">
      <h2 className="text-lg font-bold mb-4">Income & Expense Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export default IncomeExpenseLineChart;