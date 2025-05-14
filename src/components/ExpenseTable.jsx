// import { useEffect, useState } from "react";
// import { getFromLocalStorage } from "../utils/storage";
// import { paginate } from "../utils/paginate";

// export default function ExpenseTable() {
//   const [expenses, setExpenses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const stored = getFromLocalStorage("expenses");
//     setExpenses(stored);
//   }, []);

//   const pagedData = paginate(expenses, currentPage, itemsPerPage);
//   const totalPages = Math.ceil(expenses.length / itemsPerPage);

//   return (
//     <div className="w-full my-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">💸 Expense Records</h2>
//       <div className="overflow-x-auto rounded-box border border-base-300">
//         <table className="table table-zebra">
//         <thead className="bg-base-200">
//           <tr>
//             <th>#</th>
//             <th>Date</th>
//             <th>Item</th>
//             <th>Qty</th>
//             <th>Unit Price</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pagedData.map((exp, i) => (
//             <tr key={i}>
//               <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
//               <td>{exp.date}</td>
//               <td>{exp.item}</td>
//               <td>{exp.quantity}</td>
//               <td>{exp.price}</td>
//               <td>{exp.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
  

//       {/* Pagination */}
//       <div className="flex justify-end mt-4">
//         <div className="join">
//           {/* Previous button */}
//           <button
//             className="join-item btn"
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             « Prev
//           </button>

//           {/* Page numbers */}
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               className={`join-item btn ${
//                 currentPage === i + 1 ? "btn-active" : ""
//               }`}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}

//           {/* Next button */}
//           <button
//             className="join-item btn"
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             Next »
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

 function ExpenseTable({ expenses = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = expenses.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Expense Table</h2>
      {expenses.length === 0 ? (
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
  );
}

export default ExpenseTable;