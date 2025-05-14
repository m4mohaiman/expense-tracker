import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase"; // Adjust the import path as necessary

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = expenses.slice(startIndex, startIndex + itemsPerPage);
  const grandTotal = expenses.reduce(
    (acc, item) => acc + parseFloat(item.total),
    0
  );

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching expenses:", error.message);
      } else {
        setExpenses(data);
      }

      setLoading(false);
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Expense Table</h2>
      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expense records found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full min-w-[600px]">
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
                    <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                    <td>{item.item}</td>
                    <td>{item.quantity}</td>
                    <td>{parseFloat(item.price).toFixed(2)}</td>
                    <td>{parseFloat(item.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-2 font-bold">
              Grand Total:{" "}
              <span className="text-green-600">
                {grandTotal.toFixed(2)} BDT
              </span>
            </div>
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
  );
}

export default ExpenseTable;
