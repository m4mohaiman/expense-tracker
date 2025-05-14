import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // make sure supabaseClient is correctly imported

function ExpenseForm() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newExpense, setNewExpense] = useState({
    date: "",
    item: "",
    quantity: "",
    price: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("expense")
      .select("*")
      .order("date", { ascending: false });

    if (!error) {
      setExpenses(data);
    }
    setLoading(false);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const { date, item, quantity, price } = newExpense;
    const total = parseFloat(quantity) * parseFloat(price);

    const { error } = await supabase.from("expense").insert([
      {
        date,
        item,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        total,
      },
    ]);

    if (!error) {
      // Optimistically add new data to UI
      setExpenses((prev) => [
        {
          date,
          item,
          quantity: parseFloat(quantity),
          price: parseFloat(price),
          total,
        },
        ...prev,
      ]);

      // Clear form
      setNewExpense({ date: "", item: "", quantity: "", price: "" });
    }
  };

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = expenses.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add Expense</h1>
      <form onSubmit={handleAddExpense} className="grid grid-cols-2 gap-4">
        <input
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          required
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="Item"
          value={newExpense.item}
          onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
          required
          className="input input-bordered"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newExpense.quantity}
          onChange={(e) => setNewExpense({ ...newExpense, quantity: e.target.value })}
          required
          className="input input-bordered"
        />
        <input
          type="number"
          placeholder="Price"
          value={newExpense.price}
          onChange={(e) => setNewExpense({ ...newExpense, price: e.target.value })}
          required
          className="input input-bordered"
        />
        <button type="submit" className="btn btn-primary col-span-2">
          Add Expense
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Expense Table</h2>
        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="text-center text-gray-500">No expense records found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total (BDT)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={startIndex + index}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.item}</td>
                      <td>{item.quantity}</td>
                      <td>{parseFloat(item.price).toFixed(2)}</td>
                      <td>{parseFloat(item.total).toFixed(2)}</td>
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

export default ExpenseForm;
