import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { useHomeContext } from "../context/HomeContext";
import { useEffect } from "react";
import ProductsManagement from "../components/createEditProducts/ProductsManagement";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7.2fr;
  grid-template-areas: "sidebar products_management";
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "products_management";
    height: 100vh;
  }
`;

function ProductsManagementPage() {
  const { setActiveCategory } = useHomeContext();

  useEffect(
    function () {
      setActiveCategory("products_management");
    },
    [setActiveCategory]
  );

  return (
    <HomeContainer>
      <Sidebar />
      <ProductsManagement />
    </HomeContainer>
  );
}

export default ProductsManagementPage;
