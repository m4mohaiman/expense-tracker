import { useEffect, useState } from "react";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import IncomeTable from "../components/IncomeTable";
import ExpenseTable from "../components/ExpenseTable";
import CompareChart from "../components/CompareChart";
import ProportionChart from "../components/ProportionChart";
import IncomeExpenseLineChart from "../components/IncomeExpenseLineChart";

export default function Dashboard() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setIncomes(savedIncomes);
    setExpenses(savedExpenses);
  }, []);


const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
const totalExpense = expenses.reduce((sum, item) => sum + Number(item.total || 0), 0);

  const balance = totalIncome - totalExpense;

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
      <div className="w-full pt-5 pb-5"> 
        
        <IncomeExpenseLineChart incomes={incomes} expenses={expenses} />

        <CompareChart
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
        <ProportionChart
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>
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

      <div className="grid md:grid-cols-2 gap-6">
        <IncomeTable incomes={incomes} />
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
}
