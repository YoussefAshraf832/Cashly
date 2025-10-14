import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Expenses from "../components/expenses/Expenses";
import { useHomeContext } from "../context/HomeContext";
import { useEffect } from "react";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7.2fr;
  grid-template-areas: "sidebar express";
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "express";
    height: 100vh;
  }
`;

function ExpressPage() {
  const { setActiveCategory } = useHomeContext();

  useEffect(
    function () {
      setActiveCategory("expenses");
    },
    [setActiveCategory]
  );

  return (
    <HomeContainer>
      <Sidebar />
      <Expenses />
    </HomeContainer>
  );
}

export default ExpressPage;
