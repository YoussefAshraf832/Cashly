import { createContext, useContext, useState } from "react";

const AccountsContext = createContext();

function AccountsContextProvider({ children }) {
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      date: new Date(Date.now()).toLocaleString().split("T")[0],
      time: "14:30",
      branch: "الفرع الرئيسي",
      customer: "عمر أحمد",
      items: [
        { id: 1, name: "قهوة تركية", price: 15, quantity: 2, total: 30 },
        { id: 2, name: "كرواسون", price: 25, quantity: 1, total: 25 },
      ],
      subtotal: 55,
      discount: 0,
      tax: 5.5,
      total: 60.5,
    },
    {
      id: "INV-002",
      date: new Date(Date.now()).toLocaleString().split("T")[0],
      time: "10:15",
      branch: "الفرع الرئيسي",
      customer: "محمود السيد",
      items: [
        { id: 3, name: "شاي بالنعناع", price: 10, quantity: 3, total: 30 },
        { id: 4, name: "كعكة الشوكولاتة", price: 30, quantity: 2, total: 60 },
      ],
      subtotal: 90,
      discount: 10,
      tax: 8,
      total: 88,
    },
    {
      id: "INV-003",
      date: new Date(Date.now()).toLocaleString().split("T")[0],
      time: "16:45",
      branch: "فرع المدينة",
      customer: "سارة محمد",
      items: [
        { id: 5, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 6, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
      ],
      subtotal: 90,
      discount: 5,
      tax: 8.55,
      total: 93.55,
    },
  ]);

  // بيانات المصروفات للاختبار
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      type: "مواد خام",
      amount: 500,
      date: new Date(Date.now()).toLocaleString().split("T")[0],
      description: "شراء قهوة وسكر",
    },
    {
      id: 2,
      type: "مرتبات",
      amount: 1500,
      date: new Date(Date.now()).toLocaleString().split("T")[0],
      description: "راتب الموظف أحمد",
    },
    {
      id: 3,
      type: "فواتير",
      amount: 350,
      date: new Date(Date.now()).toLocaleString().split("T")[0],
      description: "فاتورة الكهرباء",
    },
    {
      id: 4,
      type: "صيانة",
      amount: 200,
      date: new Date(Date.now()).toLocaleString().split("T")[0],
      description: "صيانة ماكينة القهوة",
    },
  ]);

  // حالة البحث
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );

  // حالة الجداول المفتوحة/المغلقة
  const [isInvoicesTableOpen, setIsInvoicesTableOpen] = useState(false);
  const [isExpensesTableOpen, setIsExpensesTableOpen] = useState(false);

  // حالة التأكيد
  const [showConfirmation, setShowConfirmation] = useState(false);

  // البحث عن فاتورة
  const searchInvoice = (invoices) => {
    const result = invoices.find((invoice) => invoice.code === searchTerm);
    setSearchResult(result || null);
  };

  // إلغاء البحث
  const cancelSearch = () => {
    setSearchTerm("");
    setSearchResult(null);
  };

  // تصفية الفواتير حسب التاريخ
  const filteredInvoices = invoices?.filter(
    (invoice) => invoice.date === dateFilter
  );
  const filteredExpenses = expenses?.filter(
    (expense) => expense.date === dateFilter
  );

  // حساب الإجماليات
  const totalSales = filteredInvoices?.reduce(
    (sum, invoice) => sum + invoice?.total,
    0
  );
  const totalExpenses = filteredExpenses?.reduce(
    (sum, expense) => sum + expense?.amount,
    0
  );
  const netAmount = totalSales - totalExpenses;

  // تأكيد التسليم
  const confirmDelivery = () => {
    setShowConfirmation(true);
  };

  // تنفيذ التسليم
  const handleDelivery = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      alert("تم تسليم الحسابات بنجاح للمدير");
      // هنا يمكن إضافة منطق لحفظ حالة التسليم في قاعدة البيانات
    }
  };

  const obj = {
    invoices,
    setInvoices,
    expenses,
    setExpenses,
    searchTerm,
    setSearchTerm,
    searchResult,
    setSearchResult,
    dateFilter,
    setDateFilter,
    isInvoicesTableOpen,
    setIsInvoicesTableOpen,
    isExpensesTableOpen,
    setIsExpensesTableOpen,
    showConfirmation,
    setShowConfirmation,
    searchInvoice,
    cancelSearch,
    filteredInvoices,
    filteredExpenses,
    totalSales,
    totalExpenses,
    netAmount,
    confirmDelivery,
    handleDelivery,
    searchFilter,
    setSearchFilter,
  };

  return (
    <AccountsContext.Provider value={obj}>{children}</AccountsContext.Provider>
  );
}

function useAccountsContext() {
  const context = useContext(AccountsContext);

  if (context === undefined)
    throw new Error(
      "useAccountsContext was used outside of AccountsContextProvider"
    );

  return context;
}

export { AccountsContextProvider, useAccountsContext };
