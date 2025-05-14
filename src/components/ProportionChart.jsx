import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';


const COLORS = ['#2ecc71', '#e74c3c']; // green and red

 function ProportionChart( { totalIncome, totalExpense }) {
  const data = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense },
  ];
  return (
    <div className="w-full h-64 bg-base-100 rounded-xl shadow-md p-4 my-6">
      <h2 className="text-lg font-bold mb-4">Income vs Expense Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


export default ProportionChart