import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; //
import toast from "react-hot-toast";

export default function IncomeForm({ incomes, setIncomes }) {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newIncome, setNewIncome] = useState({
    date: "",
    source: "",
    amount: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("income")
      .select("*")
      .order("date", { ascending: false });

    if (!error) {
      setIncome(data);
    }
    setLoading(false);
  };
  const handleAddIncome = async (e) => {
    e.preventDefault();

    const { date, source, amount } = newIncome;

    const { error } = await supabase.from("income").insert([
      {
        date,
        source,
        amount,
      },
    ]);

    if (!error) {
      // Optimistically add new data to UI
      setIncome((prev) => [
        {
          date,
          source,
          amount,
        },
        ...prev,
      ]);

      // Clear form
      setNewIncome({ date: "", source: "", amount: "" });
    }
  };

  const totalPages = Math.ceil(income.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = income.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-box">
      <h2 className="text-lg font-semibold mb-4">Add Income</h2>
      <form onSubmit={handleAddIncome} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            value={newIncome.date}
            onChange={(e) =>
              setNewIncome({ ...newIncome, date: e.target.value })
            }
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Source</span>
          </label>
          <input
            type="text"
            value={newIncome.source}
            onChange={(e) =>
              setNewIncome({ ...newIncome, source: e.target.value })
            }
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="number"
            value={newIncome.amount}
            onChange={(e) =>
              setNewIncome({ ...newIncome, amount: e.target.value })
            }
            className="input input-bordered w-full"
            placeholder="e.g., Salary, Freelance"
          />
        </div>

        <button type="submit" className="btn btn-success w-full text-white">
          Add Income
        </button>
      </form>

      
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Expense Table</h2>
        {loading ? (
          <p>Loading...</p>
        ) : incomes.length === 0 ? (
          <p className="text-center text-gray-500">No expense records found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Source</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={startIndex + index}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.source}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  « Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`join-item btn ${
                      currentPage === i + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="join-item btn"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next »
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
