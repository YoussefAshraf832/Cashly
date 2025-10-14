import { useState } from "react";
import styled from "styled-components";
import ProductsTable from "./ProductsTable";
import ActionButtons from "./ActionButtons";
import { useLoginContext } from "../../context/LoginContext";
import { useCreateUpdateInfoProducts } from "../../hooks/products/useCreateUpdateInfoProducts";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  /* min-height: 100vh; */

  grid-area: products_management;
  overflow-y: auto;
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: center;
`;

function ProductsManagement() {
  const [products, setProducts] = useState([
    {
      id: Date.now(),
      code: "",
      name: "",
      category: "",
      subCategory: "",
      price: "",
    },
  ]);

  const { cookies } = useLoginContext();
  const { useCreateUpdateProducts: saveInfoProducts, isLoading } =
    useCreateUpdateInfoProducts(setProducts);

  const addNewProduct = () => {
    const newProduct = {
      id: Date.now(),
      code: "",
      name: "",
      category: "",
      subCategory: "",
      price: "",
      discount: "",
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setProducts(
      products?.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const saveProducts = () => {
    if (!products.length) return;

    saveInfoProducts({ cookies, products });
  };

  return (
    <Container>
      <Header>
        <Title>إدارة المنتجات</Title>
        <Subtitle>إضافة وتعديل المنتجات</Subtitle>
      </Header>

      <ActionButtons
        onAddProduct={addNewProduct}
        onSaveProducts={saveProducts}
        isLoading={isLoading}
      />

      <ProductsTable
        products={products}
        onDeleteProduct={deleteProduct}
        onUpdateProduct={updateProduct}
      />
    </Container>
  );
}

export default ProductsManagement;
