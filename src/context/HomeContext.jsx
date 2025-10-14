import { createContext, useContext, useState } from "react";

const HomeContext = createContext();

function HomeContextProvider({ children }) {
  const categories = [
    {
      id: 1,
      name: "مشروبات",
      products: [
        {
          id: 101,
          name: "قهوة",
          price: 15,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 102,
          name: "شاي",
          price: 10,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 103,
          name: "عصير برتقال",
          price: 20,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 104,
          name: "عصير برتقال",
          price: 20,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 105,
          name: "عصير برتقال",
          price: 20,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 106,
          name: "عصير برتقال",
          price: 20,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 107,
          name: "عصير برتقال",
          price: 20,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 108,
          name: "عصير برتقال",
          price: 20,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 109,
          name: "عصير برتقال",
          price: 20,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 110,
          name: "عصير برتقال مع الجزر بالقتع و الموز",
          price: 20,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 2,
      name: "مخبوزات",
      products: [
        {
          id: 201,
          name: "كرواسون",
          price: 25,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 202,
          name: "كعكة الشوكولاتة",
          price: 30,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 3,
      name: "سندوتشات",
      products: [
        {
          id: 301,
          name: "سندوتش جبن",
          price: 35,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 302,
          name: "سندوتش تونة",
          price: 40,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
  ];

  const [productFilter1, setProductFilter1] = useState("");
  const [productFilter2, setProductFilter2] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  // حالة الفاتورة

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(1);

  // إضافة منتج إلى الفاتورة
  const addToInvoice = (product) => {
    const count = product?.quantityInBranch?.find(
      (branch) => branch.branch._id === selectedBranch
    )?.quantity;
    if (count === 0 || !count) return;
    const existingItem = invoiceItems?.find((item) => item.id === product.id);

    if (existingItem) {
      setInvoiceItems(
        invoiceItems?.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1 > count ? count : item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setInvoiceItems([...invoiceItems, { ...product, quantity: 1 }]);
    }
  };

  // إزالة منتج من الفاتورة
  const removeFromInvoice = (productId) => {
    setInvoiceItems(invoiceItems?.filter((item) => item.id !== productId));
  };

  // تعديل كمية المنتج في الفاتورة
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 0) {
      removeFromInvoice(productId);
      return;
    }

    setInvoiceItems(
      invoiceItems?.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // حساب الإجمالي
  const calculateTotal = () => {
    return invoiceItems?.reduce(
      (total, item) => total + (item.price - item.discount) * item.quantity,
      0
    );
  };

  // إتمام عملية الشراء
  const completePurchase = () => {
    if (invoiceItems?.length === 0) return;

    setInvoiceItems([]);
  };
  const obj = {
    invoiceItems,
    setInvoiceItems,
    categories,
    activeCategory,
    setActiveCategory,
    addToInvoice,
    updateQuantity,
    completePurchase,
    removeFromInvoice,
    calculateTotal,
    setProductFilter1,
    productFilter1,
    productFilter2,
    setProductFilter2,
    selectedBranch,
    setSelectedBranch,
  };
  return <HomeContext.Provider value={obj}>{children}</HomeContext.Provider>;
}

function useHomeContext() {
  const context = useContext(HomeContext);

  if (context === undefined)
    throw new Error("useHomeContext was used outside of HomeContextProvider");

  return context;
}

export { HomeContextProvider, useHomeContext };
