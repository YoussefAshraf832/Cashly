import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { theme } from "../../GlobalStyle";
import SearchSection from "./SearchSection";
import MainProductsTable from "./MainProductsTable";
import BranchDropdown from "./BranchSection";
import { useLoginContext } from "../../context/LoginContext";
import { useAllProductsInBranch } from "../../hooks/products/useGetAllProductsInBranch";
import UpdateProductsTable from "./UpdateProductsTable";
import { PageSpinner } from "../../utils/Spinner";

const PageContainer = styled.div`
  /* min-height: 100vh; */
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
  grid-area: products_details;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const PageTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xxl};
  margin-bottom: ${theme.spacing.sm};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageSubtitle = styled.p`
  color: ${theme.colors.muted};
  font-size: ${theme.fontSizes.md};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  gap: ${theme.spacing.lg};

  @media (max-width: 1330px) {
    grid-template-columns: minmax(300px, 1fr);
    max-width: 100%;
  }
`;

const MainContent = styled.div``;

const SideContent = styled.div``;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const StatCard = styled.div`
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.base};
  box-shadow: ${theme.shadows.soft};
  text-align: center;
  border-left: 4px solid ${(props) => props.color || theme.colors.primary};
`;

const StatNumber = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: bold;
  color: ${(props) => props.color || theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${theme.colors.muted};
  font-size: ${theme.fontSizes.sm};
`;

const ProductsDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [branchValue, setBranchValue] = useState({});

  const { cookies, userLogin } = useLoginContext();

  const branchId = userLogin?.user.branch?._id || branchValue?.id;

  const {
    isLoading,
    products: data,
    error,
  } = useAllProductsInBranch(cookies, null);

  if (error) toast.error(error.message);

  if (isLoading) return <PageSpinner />;

  const allProducts = searchTerm
    ? data?.data?.data?.filter(
        (product) =>
          product.name.includes(searchTerm) || product.code.includes(searchTerm)
      )
    : data?.data?.data;

  const products = branchId
    ? allProducts?.filter((product) =>
        product?.quantityInBranch?.find((obj) => obj.branch._id === branchId)
      )
    : [];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>استعلام المنتجات</PageTitle>
        {/* <PageSubtitle>عرض وإدارة معلومات المخزون</PageSubtitle> */}
      </PageHeader>

      {/* <StatsContainer>
        <StatCard color={theme.colors.primary}>
          <StatNumber color={theme.colors.primary}>{totalProducts}</StatNumber>
          <StatLabel>إجمالي المنتجات</StatLabel>
        </StatCard>
        <StatCard color="#4CAF50">
          <StatNumber color="#4CAF50">{availableProducts}</StatNumber>
          <StatLabel>منتجات متوفرة</StatLabel>
        </StatCard>
        <StatCard color="#FF9800">
          <StatNumber color="#FF9800">{lowStockProducts}</StatNumber>
          <StatLabel>منتجات منخفضة</StatLabel>
        </StatCard>
        <StatCard color={theme.colors.accent}>
          <StatNumber color={theme.colors.accent}>{totalQuantity}</StatNumber>
          <StatLabel>إجمالي الكمية</StatLabel>
        </StatCard>
      </StatsContainer> */}

      {["owner", "admin"].includes(userLogin?.user?.role) && (
        <BranchDropdown
          branchValue={branchValue}
          setBranchValue={setBranchValue}
        />
      )}

      <SearchSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <ContentGrid>
        <MainContent>
          <MainProductsTable
            products={products}
            searchTerm={searchTerm}
            branchValue={branchValue}
          />
        </MainContent>
        <SideContent>
          {["owner", "admin"].includes(userLogin?.user?.role) && (
            <UpdateProductsTable products={data?.data?.data} />
          )}
        </SideContent>
      </ContentGrid>
    </PageContainer>
  );
};

export default ProductsDetails;
