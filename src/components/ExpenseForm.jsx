// import { useState } from "react";
// import { saveToLocalStorage } from "../utils/storage";
// import { toast } from "react-hot-toast";

// export default function ExpenseForm() {
//   const [date, setDate] = useState("");
//   const [item, setItem] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [total, setTotal] = useState(0);

//   const handleQuantityChange = (e) => {
//     const qty = e.target.value;
//     setQuantity(qty);
//     setTotal(qty * price);
//   };

//   const handlePriceChange = (e) => {
//     const prc = e.target.value;
//     setPrice(prc);
//     setTotal(prc * quantity);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!date || !item || !quantity || !price) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     const newExpense = {
//       date,
//       item,
//       quantity,
//       price,
//       total,
//     };

//     saveToLocalStorage("expenses", newExpense);
//     toast.success("Expense added successfully!");

//     // Reset form
//     setDate("");
//     setItem("");
//     setQuantity("");
//     setPrice("");
//     setTotal(0);
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-box">
//       <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="label">Date</label>
//           <input
//             type="date"
//             className="input input-bordered w-full"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="label">Item Name</label>
//           <input
//             type="text"
//             className="input input-bordered w-full"
//             placeholder="e.g. Grocery"
//             value={item}
//             onChange={(e) => setItem(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="label">Quantity</label>
//             <input
//               type="number"
//               min="1"
//               className="input input-bordered w-full"
//               value={quantity}
//               onChange={handleQuantityChange}
//             />
//           </div>

//           <div>
//             <label className="label">Unit Price (BDT)</label>
//             <input
//               type="number"
//               min="0"
//               className="input input-bordered w-full"
//               value={price}
//               onChange={handlePriceChange}
//             />
//           </div>
//         </div>

//         <div>
//           <label className="label">Total (BDT)</label>
//           <input
//             type="number"
//             className="input input-bordered w-full bg-base-200"
//             value={total}
//             readOnly
//           />
//         </div>

//         <button className="btn btn-primary w-full mt-2">Save Expense</button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import toast from "react-hot-toast";

function ExpenseForm({ addExpense }) {
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const total =
    quantity && price ? parseFloat(quantity) * parseFloat(price) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !item || !quantity || !price) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newExpense = {
      date,
      item,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      total: parseFloat((quantity * price).toFixed(2)),
    };

    addExpense(newExpense);

    toast.success("Expense added!");
    setDate("");
    setItem("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-box">
      <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Date</label>
          <input
            type="date"
             className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Expense Item</label>
          <input
            type="text"
             className="input input-bordered w-full"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Quantity</label>
            <input
              type="number"
               className="input input-bordered w-full"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">Price (BDT)</label>
            <input
              type="number"
               className="input input-bordered w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">Total</label>
          <input
            type="text"
            className="input input-bordered w-full bg-base-200"
            value={total.toFixed(2)}
            disabled
          />
        </div>

        <button type="submit" className="btn btn-error w-full text-white">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
