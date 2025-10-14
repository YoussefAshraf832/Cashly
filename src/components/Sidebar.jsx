import styled from "styled-components";
import { useHomeContext } from "../context/HomeContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLoginContext } from "../context/LoginContext";
import { useAllProductsInBranch } from "../hooks/products/useGetAllProductsInBranch";
import { useExpensesContext } from "../context/ExpensesContext";

const StyledSidebar = styled.aside`
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.lighter};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: ${({ theme }) => theme.transition};

  /* ارتفاع ثابت مع scroll */
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  min-width: 170px;

  /* تخصيص شكل الـ scrollbar بدون background */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  /* إظهار الـ scrollbar عند التمرير أو الـ hover */
  &:hover::-webkit-scrollbar-thumb,
  &:focus-within::-webkit-scrollbar-thumb {
    opacity: 1;
  }

  /* للمتصفحات الأخرى */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &:hover {
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }

  @media (max-width: 767px) {
    height: auto;
    max-height: none;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    gap: ${({ theme }) => theme.spacing.md};
    justify-content: space-between;

    /* scrollbar للموبايل أفقي */
    &::-webkit-scrollbar {
      height: 4px;
      width: auto;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
    }

    ul {
      display: flex;
      flex-direction: row;
      gap: ${({ theme }) => theme.spacing.lg};
      margin: 0;
      padding: 0;
    }
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;

  @media (max-width: 767px) {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SidebarSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    color: ${({ theme }) => theme.colors.lighter};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: 600;

    @media (max-width: 767px) {
      margin: 0;
      white-space: nowrap;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    @media (max-width: 767px) {
      display: flex;
      flex-direction: row;
      gap: ${({ theme }) => theme.spacing.md};
    }
  }

  @media (max-width: 767px) {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const SidebarItem = styled.li`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  list-style: none;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: translateX(2px);
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 767px) {
    margin-bottom: 0;
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.md};

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

function Sidebar() {
  const params = useParams();

  const {
    setProductFilter1,
    setProductFilter2,
    activeCategory,
    setActiveCategory,
  } = useHomeContext();
  const { userLogin, cookies } = useLoginContext();
  const { isLoading, products, error } = useAllProductsInBranch(
    cookies,
    null,
    userLogin
  );

  const { setFilter } = useExpensesContext();

  const navigate = useNavigate();
  const idActive = useParams();

  const categorie = products?.data?.data?.reduce((cur, acc) => {
    if (cur.includes(acc.filter1)) {
      return cur;
    } else {
      return [...cur, acc.filter1];
    }
  }, []);

  useEffect(
    function () {
      if (idActive.id === "all") {
        setActiveCategory(() => idActive.id);
      }
      if (idActive.id !== "all") {
        setActiveCategory(() => +idActive.id);
      }
    },
    [idActive, setActiveCategory]
  );

  const handleExpensesClick = function () {
    setFilter("all");
    navigate("/expenses");
  };

  const handleIncomesClick = function () {
    navigate("/incomes");
  };

  const handleAccountsClick = function () {
    navigate("/accounts");
  };

  const handleProductsClick = function () {
    navigate("/products");
  };

  const handleProductsManagementClick = function () {
    navigate("/products_management");
  };

  const handleProductsDetailsClick = function () {
    navigate("/products_details");
  };

  return (
    <StyledSidebar>
      <SidebarContent>
        <SidebarSection>
          <h3>Menu list</h3>
          <ul>
            <SidebarItem
              onClick={() => {
                setProductFilter1("");
                navigate("/home/all");
              }}
              className={activeCategory === "all" ? "active" : ""}
            >
              الكل
            </SidebarItem>
            {categorie?.map((category, i) => (
              <SidebarItem
                key={i + 1}
                onClick={() => {
                  setProductFilter1(category);
                  setFilter("all");
                  setProductFilter2("");
                  navigate(`/home/${i + 1}`);
                  setActiveCategory(() => i + 1);
                }}
                className={activeCategory === i + 1 ? "active" : ""}
              >
                {category}
              </SidebarItem>
            ))}
          </ul>
        </SidebarSection>

        <SidebarSection>
          <h3>Finance</h3>
          <ul>
            <SidebarItem
              onClick={handleExpensesClick}
              className={activeCategory === "expenses" ? "active" : ""}
            >
              المصروفات
            </SidebarItem>

            {["admin", "owner", "manager"].includes(userLogin?.user?.role) && (
              <SidebarItem
                onClick={handleIncomesClick}
                className={activeCategory === "incomes" ? "active" : ""}
              >
                المبيعات
              </SidebarItem>
            )}

            {["admin", "owner", "manager", "supervisor"].includes(
              userLogin?.user?.role
            ) && (
              <SidebarItem
                onClick={handleAccountsClick}
                className={activeCategory === "accounts" ? "active" : ""}
              >
                الحسابات
              </SidebarItem>
            )}

            {[
              "admin",
              "owner",
              "manager",
              "supervisor",
              "user-received",
              "received",
            ].includes(userLogin?.user?.role) && (
              <SidebarItem
                onClick={handleProductsClick}
                className={activeCategory === "products" ? "active" : ""}
              >
                استلام المنتجات
              </SidebarItem>
            )}

            {["admin", "owner", "manager-products"].includes(
              userLogin?.user?.role
            ) && (
              <SidebarItem
                onClick={handleProductsManagementClick}
                className={
                  activeCategory === "products_management" ? "active" : ""
                }
              >
                اداره المنتجات
              </SidebarItem>
            )}

            {["admin", "owner", "manager", "supervisor"].includes(
              userLogin?.user?.role
            ) && (
              <SidebarItem
                onClick={handleProductsDetailsClick}
                className={
                  activeCategory === "products_details" ? "active" : ""
                }
              >
                تفاصيل المنتجات
              </SidebarItem>
            )}
          </ul>
        </SidebarSection>
      </SidebarContent>
    </StyledSidebar>
  );
}

export default Sidebar;
