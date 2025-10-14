import styled from "styled-components";

const TableContainer = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;
`;

const TableTitle = styled.h3`
  background: #ff9800;
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const WarningIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const TableWrapper = styled.div`
  height: 250px;
  overflow-y: auto;

  /* إخفاء الاسكرول بار */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff9800;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #f57c00;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #ffe0b2;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: right;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 2px solid #ff9800;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #fff3e0;
  }

  &:hover {
    background: #ffe0b2;
    transition: background ${({ theme }) => theme.transition};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  text-align: right;
  border-bottom: 1px solid #ffe0b2;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const QuantityCell = styled(TableCell)`
  font-weight: bold;
  color: #ff5722;
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const LowStockTable = ({ products }) => {
  const lowStockProducts = products?.filter(
    (product) => product?.currentQuantity <= 10
  );

  return (
    <TableContainer>
      <TableTitle>
        <WarningIcon>⚠️</WarningIcon>
        المنتجات المنخفضة ({lowStockProducts?.length})
      </TableTitle>
      <TableWrapper>
        {lowStockProducts?.length > 0 ? (
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>اسم المنتج</TableHeaderCell>
                <TableHeaderCell>الكود</TableHeaderCell>
                <TableHeaderCell>العدد المتبقي</TableHeaderCell>
                <TableHeaderCell>العدد الإجمالي</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {lowStockProducts?.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <QuantityCell>{product.currentQuantity}</QuantityCell>
                  <TableCell>{product.totalQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState>🎉 جميع المنتجات متوفرة بكميات كافية</EmptyState>
        )}
      </TableWrapper>
    </TableContainer>
  );
};

export default LowStockTable;
