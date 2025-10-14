import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Incomes from "../components/incomes/Incomes";
import { useHomeContext } from "../context/HomeContext";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7.2fr;
  grid-template-areas: "sidebar incomes";
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "incomes";
    height: 100vh;
  }
`;

function IncomesPage() {
  const { setActiveCategory } = useHomeContext();

  setActiveCategory("incomes");

  return (
    <HomeContainer>
      <Sidebar />
      <Incomes />
    </HomeContainer>
  );
}

export default IncomesPage;
