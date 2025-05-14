import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import IncomeForm from "./components/IncomeForm";
import IncomeTable from "./components/IncomeTable";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      
      <div className="container mx-auto px-4">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
