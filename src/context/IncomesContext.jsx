import { createContext, useContext, useState } from "react";

const IncomesContext = createContext();

function IncomesContextProvider({ children }) {
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      date: "2023-10-15",
      time: "14:30",
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
      date: "2023-10-16",
      time: "10:15",
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
      date: "2023-10-17",
      time: "16:45",
      customer: "سارة محمد",
      items: [
        { id: 5, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 6, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
        { id: 7, name: "عصير برتقال", price: 20, quantity: 1, total: 20 },
        { id: 8, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 9, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
        { id: 10, name: "عصير برتقال", price: 20, quantity: 1, total: 20 },
        { id: 11, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 12, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
        { id: 13, name: "عصير برتقال", price: 20, quantity: 1, total: 20 },
        { id: 14, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 15, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
        { id: 16, name: "عصير برتقال", price: 20, quantity: 1, total: 20 },
        { id: 17, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 18, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
        { id: 19, name: "عصير برتقال", price: 20, quantity: 1, total: 20 },
        { id: 20, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 21, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
        { id: 22, name: "عصير برتقال", price: 20, quantity: 1, total: 20 },
        { id: 23, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 24, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
        { id: 25, name: "عصير برتقال", price: 20, quantity: 1, total: 20 },
        { id: 26, name: "كابتشينو", price: 20, quantity: 1, total: 20 },
        { id: 27, name: "سندوتش جبن", price: 35, quantity: 2, total: 70 },
        { id: 28, name: "عصير برتقال", price: 20, quantity: 1, total: 20 },
      ],
      subtotal: 110,
      discount: 5,
      tax: 10.45,
      total: 115.45,
    },
  ]);

  // حالة البحث
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // حالة الجداول المفتوحة/المغلقة
  const [isProductsTableOpen, setIsProductsTableOpen] = useState(false);
  const [isInvoicesTableOpen, setIsInvoicesTableOpen] = useState(false);
  // في IncomesContext.jsx (إضافة هذه الدوال والحالات)
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [branchFilter, setBranchFilter] = useState("all");
  const [branches, setBranches] = useState([
    { id: "branch1", name: "الفرع الرئيسي" },
    { id: "branch2", name: "فرع الرياض" },
    { id: "branch3", name: "فرع جدة" },
    // { id: "all", name: "كل الفروع" },
  ]);
  const [searchText, setSearchText] = useState("");

  const applyFilters = () => {
    // تطبيق الفلتر على البيانات
    // هنا سيتم تطبيق الفلتر على invoices و soldProducts
  };

  const resetFilters = () => {
    setDateRange({
      startDate: "",
      endDate: "",
    });
    setBranchFilter("all");
    // إعادة تعيين البيانات إلى حالتها الأصلية
  };

  // البحث عن فاتورة
  const searchInvoice = () => {
    const result = invoices.find(
      (invoice) => invoice.id.toLowerCase() === searchTerm.toLowerCase().trim()
    );
    setSearchResult(result || null);
  };

  // حساب إجمالي المبيعات
  const totalSales = invoices.reduce((sum, invoice) => sum + invoice.total, 0);

  // حساب إجمالي المنتجات المباعة
  const soldProducts = invoices.reduce((acc, invoice) => {
    invoice.items.forEach((item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.total += item.total;
      } else {
        acc.push({ ...item });
      }
    });
    return acc;
  }, []);

  const obj = {
    invoices,
    setInvoices,
    searchTerm,
    setSearchTerm,
    searchResult,
    setSearchResult,
    isProductsTableOpen,
    setIsProductsTableOpen,
    isInvoicesTableOpen,
    setIsInvoicesTableOpen,
    searchInvoice,
    totalSales,
    soldProducts,
    branches,
    setBranches,
    applyFilters,
    // resetFilters,
    branchFilter,
    setBranchFilter,
    dateRange,
    setDateRange,
    searchText,
    setSearchText,
  };

  return (
    <IncomesContext.Provider value={obj}>{children}</IncomesContext.Provider>
  );
}

function useIncomesContext() {
  const context = useContext(IncomesContext);

  if (context === undefined)
    throw new Error("useHomeContext was used outside of HomeContextProvider");

  return context;
}

export { IncomesContextProvider, useIncomesContext };
