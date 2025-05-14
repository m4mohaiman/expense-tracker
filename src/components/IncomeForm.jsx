// import { useState } from "react";
// import toast from "react-hot-toast";
// import { saveToLocalStorage } from "../utils/storage";

// export default function IncomeForm() {
//   const [income, setIncome] = useState({
//     date: "",
//     source: "",
//     amount: "",
//   });

//   const handleChange = (e) => {
//     setIncome({ ...income, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     saveToLocalStorage("incomes", income);
//     toast.success("Income saved!");
//     setIncome({ date: "", source: "", amount: "" });
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-box">
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-semibold mb-4">Add Income</h2>

//         <input
//           type="date"
//           name="date"
//           value={income.date}
//           onChange={handleChange}
//           className="input input-bordered w-full mb-4"
//           required
//         />
//         <input
//           type="text"
//           name="source"
//           placeholder="Income Source"
//           value={income.source}
//           onChange={handleChange}
//           className="input input-bordered w-full mb-4"
//           required
//         />
//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount (BDT)"
//           value={income.amount}
//           onChange={handleChange}
//           className="input input-bordered w-full mb-4"
//           required
//         />
//         <button type="submit" className="btn btn-primary w-full">
//           Save Income
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import toast from "react-hot-toast";

export default function IncomeForm({ incomes, setIncomes }) {
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !source || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newIncome = {
      date,
      source,
      amount: parseFloat(amount),
    };

    const updatedIncomes = [...incomes, newIncome];
    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));
    setIncomes(updatedIncomes);

    toast.success("Income added successfully!");

    // Clear form
    setDate("");
    setSource("");
    setAmount("");
  };

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-box">
      <h2 className="text-lg font-semibold mb-4">Add Income</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Income Source</span>
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="input input-bordered w-full"
            placeholder="e.g., Salary, Freelance"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Amount (BDT)</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full"
            placeholder="e.g., 5000"
          />
        </div>

        <button type="submit" className="btn btn-success w-full text-white">
          Add Income
        </button>
      </form>
    </div>
  );
}
