import { createContext, useContext, useState } from "react";

const ExpensesContext = createContext();

function ExpensesContextProvider({ children }) {
  const expenseTypes = [
    "مواد خام",
    "مرتبات",
    "إيجار",
    "فواتير",
    "صيانة",
    "نقل",
    "تسويق",
    "أخرى",
  ];

  // حالة النموذج
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  // حالة قائمة المصروفات
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      amount: 1500,
      type: "مرتبات",
      date: "2023-10-15",
      description: "راتب الموظف أحمد",
    },
    {
      id: 2,
      amount: 2000,
      type: "إيجار",
      date: "2023-10-10",
      description: "إيجار المحل لشهر أكتوبر",
    },
    {
      id: 3,
      amount: 350,
      type: "فواتير",
      date: "2023-10-05",
      description: "فاتورة الكهرباء",
    },
    {
      id: 4,
      amount: 500,
      type: "مواد خام",
      date: "2023-10-03",
      description: "شراء قهوة وسكر",
    },
  ]);

  // حالة التصفية
  const [filter, setFilter] = useState("all");

  // معالجة تغيير الحقول
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // معالجة إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(formData.amount),
      type: formData.type,
      date: formData.date,
      description: formData.description,
    };

    setExpenses([...expenses, newExpense]);

    // إعادة تعيين النموذج
    setFormData({
      amount: "",
      type: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  // حذف مصروف
  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // تصفية المصروفات
  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((expense) => expense.type === filter);

  // حساب الإجمالي
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const obj = {
    expenseTypes,
    formData,
    setFormData,
    expenses,
    setExpenses,
    filter,
    setFilter,
    handleInputChange,
    handleSubmit,
    handleDelete,
    filteredExpenses,
    totalAmount,
  };

  return (
    <ExpensesContext.Provider value={obj}>{children}</ExpensesContext.Provider>
  );
}

function useExpensesContext() {
  const context = useContext(ExpensesContext);

  if (context === undefined)
    throw new Error(
      "useExpensesContext was used outside of ExpensesContextProvider"
    );

  return context;
}

export { ExpensesContextProvider, useExpensesContext };
