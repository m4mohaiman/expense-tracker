import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';


 function CompareChart( { totalIncome, totalExpense }) {
  const data = [
    {
      name: 'Income',
      amount: totalIncome,
    },
    {
      name: 'Expense',
      amount: totalExpense,
    },
  ];
  return (
    <div className="w-full h-64 bg-base-100 rounded-xl shadow-md pt-5 pb-5 my-6">
      <h2 className="text-lg font-bold mb-4">Income vs Expense</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3b82f6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CompareChart;