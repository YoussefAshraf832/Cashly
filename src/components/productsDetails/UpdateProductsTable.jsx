import styled from "styled-components";
import { formatDateTime } from "../../utils/formatDateTime";

const TableContainer = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TableTitle = styled.h3`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const TableWrapper = styled.div`
  height: 400px;
  overflow-y: auto;

  /* إخفاء الاسكرول بار */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.secondary};
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: right;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.lighter};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transition: background ${({ theme }) => theme.transition};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  text-align: right;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const StatusBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: bold;
  background: ${(props) => (props.status === "متوفر" ? "#4CAF50" : "#FF9800")};
  color: white;
`;

const UpdateProductsTable = ({ products }) => {
  return (
    <TableContainer>
      <TableTitle>جدول تحديث المنتجات</TableTitle>
      <TableWrapper>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>اسم المنتج</TableHeaderCell>
              <TableHeaderCell>الكود</TableHeaderCell>
              <TableHeaderCell>بواسطة</TableHeaderCell>
              <TableHeaderCell>تاريخ اخر تحديث</TableHeaderCell>
              <TableHeaderCell>الوقت</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.updatedBy}</TableCell>
                <TableCell>{formatDateTime(product.updatedAt).date}</TableCell>
                <TableCell>{formatDateTime(product.updatedAt).time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default UpdateProductsTable;
