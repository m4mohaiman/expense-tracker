import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useExpenseStore = create((set) => ({
  income: [],
  expense: [],
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,

  fetchAllData: async () => {
    const { data: incomeData } = await supabase.from("income").select("*");
    const { data: expenseData } = await supabase.from("expense").select("*");

    const totalIncome = incomeData?.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const totalExpense = expenseData?.reduce((sum, item) => sum + Number(item.total || 0), 0);

    set({
      income: incomeData,
      expense: expenseData,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  },

  addExpense: async (expenseItem) => {
    const { error } = await supabase.from("expense").insert([expenseItem]);
    if (!error) {
      await useExpenseStore.getState().fetchAllData();
    }
  },

  addIncome: async (incomeItem) => {
    const { error } = await supabase.from("income").insert([incomeItem]);
    if (!error) {
      await useExpenseStore.getState().fetchAllData();
    }
  }
}));

export default useExpenseStore;
