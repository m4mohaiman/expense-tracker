import { useEffect, useState } from "react";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import CompareChart from "../components/CompareChart";
import ProportionChart from "../components/ProportionChart";
import IncomeExpenseLineChart from "../components/IncomeExpenseLineChart";
import useExpenseStore from "../store/useExpenseIncomeStore";


export default function Dashboard() {
const fetchAllData = useExpenseStore((state) => state.fetchAllData);
const totalIncome = useExpenseStore((state) => state.totalIncome);
const totalExpense = useExpenseStore((state) => state.totalExpense);
const balance = useExpenseStore((state) => state.balance);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);


  console.log(totalIncome, totalExpense, balance);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  // const [totalExpense, setTotalExpense] = useState(0);
  // const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const savedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setIncomes(savedIncomes);
    setExpenses(savedExpenses);
  }, []);


  const addExpense = (expense) => {
    const updatedExpenses = [expense, ...expenses];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const addIncome = (income) => {
    const updatedIncomes = [income, ...incomes];
    setIncomes(updatedIncomes);
    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
           <div className="w-full">
        <div className="my-6">
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-title">Total Income</div>
              <div className="stat-value text-success">
                ৳ {totalIncome.toFixed(2)}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Expense</div>
              <div className="stat-value text-error">
                ৳ {totalExpense.toFixed(2)}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Remaining Balance</div>
              <div
                className={`stat-value ${
                  balance >= 0 ? "text-primary" : "text-error"
                }`}
              >
                ৳ {balance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-5 pb-5">
        <IncomeExpenseLineChart incomes={incomes} expenses={expenses} />

        <CompareChart totalIncome={totalIncome} totalExpense={totalExpense} />
        <ProportionChart
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>
 
      <div className="grid md:grid-cols-2 gap-6">
        <IncomeForm
          incomes={incomes}
          setIncomes={setIncomes}
          addIncome={addIncome}
        />
        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          addExpense={addExpense}
        />
      </div>

    </div>
  );
}
