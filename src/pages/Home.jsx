import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import MenuList from "../components/home/MenuList";
import Invoice from "../components/home/Invoice";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4.5fr 2.7fr;
  grid-template-areas: "sidebar main invoice";
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "sidebar"
      "main"
      "invoice";
    height: 100vh;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Sidebar />

      <MenuList />

      <Invoice />
    </HomeContainer>
  );
}

export default Home;
