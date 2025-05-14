// import { useEffect, useState } from "react";
// import { getFromLocalStorage } from "../utils/storage";
// import { paginate } from "../utils/paginate";

// export default function IncomeTable() {
//   const [incomes, setIncomes] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const stored = getFromLocalStorage("incomes");
//     setIncomes(stored);
//   }, []);

//   const pagedData = paginate(incomes, currentPage, itemsPerPage);
//   const totalPages = Math.ceil(incomes.length / itemsPerPage);

//   return (
//     <div className="w-full my-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">💰 Income Records</h2>
//       <div className="overflow-x-auto rounded-box border border-base-300">
//         <table className="table table-zebra">
//           <thead className="bg-base-200">
//             <tr>
//               <th>#</th>
//               <th>Date</th>
//               <th>Source</th>
//               <th>Amount (BDT)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pagedData.length > 0 ? (
//               pagedData.map((income, index) => (
//                 <tr key={index}>
//                   <th>{index + 1}</th>
//                   <td>{income.date}</td>
//                   <td>{income.source}</td>
//                   <td>{income.amount}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center text-sm text-gray-500">
//                   No income records yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
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

export default function IncomeTable({ incomes = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(incomes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = incomes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Income Table</h2>
      {incomes.length === 0 ? (
        <p className="text-center text-gray-500">No income records found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Source</th>
                  <th>Amount (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={startIndex + index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.source}</td>
                    <td>{parseFloat(item.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
