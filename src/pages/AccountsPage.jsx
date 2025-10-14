import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { useHomeContext } from "../context/HomeContext";
import { useEffect } from "react";
import Accounts from "../components/accounts/Accounts";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7.2fr;
  grid-template-areas: "sidebar accounts";
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "accounts";
    height: 100vh;
  }
`;

function AccountsPage() {
  const { setActiveCategory } = useHomeContext();

  useEffect(
    function () {
      setActiveCategory("accounts");
    },
    [setActiveCategory]
  );

  return (
    <HomeContainer>
      <Sidebar />
      <Accounts />
    </HomeContainer>
  );
}

export default AccountsPage;
