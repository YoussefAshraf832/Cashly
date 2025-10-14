import React, { useRef } from "react";
import styled from "styled-components";
import { useProductReceiving } from "./useProducts";
import PageHeader from "./PageHeader";
import ProductTable from "./ProductTable";
import ProductRow from "./ProductRow";
import SummarySection from "./SummarySection";
import EmptyState from "./EmptyState";
import Button from "./Button";
import { useBranchs } from "../../hooks/branch/useGetAllBranch";
import { useLoginContext } from "../../context/LoginContext";
import Spinner from "../../utils/Spinner";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  grid-area: products;
  overflow-y: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.lighter} 100%
  );

  @media (max-width: 768px) {
    height: 90vh;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const AddProductBtn = styled.button`
  margin: ${({ theme }) => theme.spacing.lg} auto 0;
  display: block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.shadows.medium};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.strong};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Products = () => {
  const {
    products,
    setProducts,
    errors,
    isLoading,
    statistics,
    addProduct,
    removeProduct,
    updateProduct,
    saveReceiving,
  } = useProductReceiving();
  const { cookies, userLogin } = useLoginContext();

  const { branchs } = useBranchs(cookies, userLogin);

  const branches = ["admin", "owner", "manager", "supervisor"].includes(
    userLogin?.user.role
  )
    ? branchs?.map((branch) => {
        return { id: branch._id, value: branch.name };
      })
    : [
        {
          id: userLogin?.user.branch?._id,
          value: userLogin?.user.branch?.name,
        },
      ];

  const tableBodyRef = useRef(null);

  const handleSave = async () => {
    const result = await saveReceiving();
  };

  const emptyStateIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
    </svg>
  );

  const tableHeaderCells = [
    { content: "كود المنتج" },
    { content: "الكمية المستلمة" },
    { content: "الفرع" },
    { content: "إجراء", className: "action-header" },
  ];

  return (
    <Container>
      <PageHeader
        title="استلام المنتجات"
        subtitle="إدارة استلام المنتجات الجديدة"
      />

      <ProductTable headerCells={tableHeaderCells} tableBodyRef={tableBodyRef}>
        {products.length === 0 ? (
          <EmptyState
            icon={emptyStateIcon}
            message="لا توجد منتجات مضافة"
            action={
              <Button variant="primary" onClick={addProduct}>
                إضافة منتج أول
              </Button>
            }
          />
        ) : (
          products?.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              errors={errors[product.id]}
              onUpdate={updateProduct}
              onRemove={removeProduct}
              branches={branches}
            />
          ))
        )}
      </ProductTable>

      {products.length > 0 && (
        <>
          <SummarySection
            statistics={statistics}
            isLoading={isLoading}
            actions={[
              <Button
                variant="success"
                onClick={handleSave}
                disabled={statistics.validProducts === 0}
              >
                {isLoading ? <Spinner /> : "حفظ الاستلام"}
              </Button>,
            ]}
          />

          <AddProductBtn onClick={addProduct} disabled={isLoading}>
            + إضافة منتج آخر
          </AddProductBtn>
        </>
      )}
    </Container>
  );
};

export default Products;
