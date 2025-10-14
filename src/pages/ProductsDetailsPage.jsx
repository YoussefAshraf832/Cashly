import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { useHomeContext } from "../context/HomeContext";
import { useEffect } from "react";

import ProductsDetails from "../components/productsDetails/ProductsDetails";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7.2fr;
  grid-template-areas: "sidebar products_details";
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "products_details";
    height: 100vh;
  }
`;

function ProductsDetailsPage() {
  const { setActiveCategory } = useHomeContext();

  useEffect(
    function () {
      setActiveCategory("products_details");
    },
    [setActiveCategory]
  );

  return (
    <HomeContainer>
      <Sidebar />
      <ProductsDetails />
    </HomeContainer>
  );
}

export default ProductsDetailsPage;
