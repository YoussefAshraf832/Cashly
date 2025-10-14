import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { useHomeContext } from "../context/HomeContext";
import { useEffect } from "react";
import Products from "./../components/receivedProducts/products";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7.2fr;
  grid-template-areas: "sidebar products";
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "products";
    height: 100vh;
  }
`;

function ProductsPage() {
  const { setActiveCategory } = useHomeContext();

  useEffect(
    function () {
      setActiveCategory("products");
    },
    [setActiveCategory]
  );

  return (
    <HomeContainer>
      <Sidebar />
      <Products />
    </HomeContainer>
  );
}

export default ProductsPage;
