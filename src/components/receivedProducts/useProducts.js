import { useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { useUpdateProductBranch } from "../../hooks/products/useUpdateProductBranch";

export const useProductReceiving = () => {
  const [products, setProducts] = useState([
    { id: Date.now(), code: "", name: "", quantity: "" },
  ]);

  const { cookies, userLogin } = useLoginContext();

  const { updateProductInBranches, isLoading: isLoadingUpdate } =
    useUpdateProductBranch(setProducts);

  // const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // إضافة منتج جديد
  const addProduct = () => {
    const newProduct = {
      id: Date.now() + Math.random(),
      code: "",
      name: "",
      quantity: "",
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  // إزالة منتج
  const removeProduct = (id) => {
    setProducts((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((product) => product.id !== id);
    });

    // إزالة الأخطاء المرتبطة بهذا المنتج
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  // تحديث بيانات المنتج
  const updateProduct = (id, field, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );

    // إزالة الخطأ عند التحديث
    if (errors[id]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: null,
        },
      }));
    }
  };

  // التحقق من صحة البيانات
  const validateProducts = () => {
    const newErrors = {};
    let isValid = true;

    products.forEach((product) => {
      const productErrors = {};

      if (!product.code.trim()) {
        productErrors.code = "كود المنتج مطلوب";
        isValid = false;
      }

      // if (!product.name.trim()) {
      //   productErrors.name = "اسم المنتج مطلوب";
      //   isValid = false;
      // }

      if (!product.quantity || Number(product.quantity) <= 0) {
        productErrors.quantity = "الكمية يجب أن تكون أكبر من صفر";
        isValid = false;
      }

      if (Object.keys(productErrors).length > 0) {
        newErrors[product.id] = productErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // حفظ البيانات
  const saveReceiving = async () => {
    if (!validateProducts()) {
      return { success: false, message: "يرجى تصحيح الأخطاء أولاً" };
    }

    updateProductInBranches({ cookies, products, userLogin });

    setErrors({});
  };

  // حساب الإحصائيات
  const statistics = {
    totalProducts: products.length,
    totalQuantity: products.reduce((sum, product) => {
      return sum + (Number(product.quantity) || 0);
    }, 0),
    validProducts: products.filter(
      (product) =>
        product.code.trim() &&
        // product.name.trim() &&
        Number(product.quantity) > 0
    ).length,
  };

  return {
    products,
    setProducts,
    errors,
    isLoading: isLoadingUpdate,
    statistics,
    addProduct,
    removeProduct,
    updateProduct,
    saveReceiving,
    validateProducts,
  };
};
