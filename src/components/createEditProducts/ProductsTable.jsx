import React from "react";
import styled from "styled-components";
import ProductRow from "./ProductRow";

const TableContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  max-width: 100%;
`;

const TableHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const TableTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ScrollContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;

  /* تخصيص شكل الـ scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(121, 89, 52, 0.2);
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(121, 89, 52, 0.4);
  }

  &:hover::-webkit-scrollbar-thumb,
  &:focus-within::-webkit-scrollbar-thumb {
    opacity: 1;
  }

  /* للمتصفحات الأخرى */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &:hover {
    scrollbar-color: rgba(121, 89, 52, 0.2) transparent;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;

  @media (max-width: 768px) {
    min-width: 700px;
  }
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.lighter};
  position: sticky;
  top: 0;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  border-right: 1px solid ${({ theme }) => theme.colors.secondary};

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
  background-color: white;

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

function ProductsTable({ products, onDeleteProduct, onUpdateProduct }) {
  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>قائمة المنتجات ({products.length})</TableTitle>
      </TableHeader>

      <ScrollContainer>
        {products.length > 0 ? (
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>كود المنتج</TableHeaderCell>
                <TableHeaderCell>اسم المنتج</TableHeaderCell>
                <TableHeaderCell>الفئة</TableHeaderCell>
                <TableHeaderCell>الفئة الفرعية</TableHeaderCell>
                <TableHeaderCell>السعر (ر.س)</TableHeaderCell>
                <TableHeaderCell>الخصم (ر.س)</TableHeaderCell>
                <TableHeaderCell>الإجراءات</TableHeaderCell>
              </tr>
            </TableHead>
            <tbody>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={onDeleteProduct}
                  onUpdate={onUpdateProduct}
                />
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState>
            <p>لا توجد منتجات. اضغط على "منتج أخر" لبدء الإضافة</p>
          </EmptyState>
        )}
      </ScrollContainer>
    </TableContainer>
  );
}

export default ProductsTable;
