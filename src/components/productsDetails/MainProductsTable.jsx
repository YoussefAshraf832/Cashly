import styled from "styled-components";
import { useLoginContext } from "../../context/LoginContext";
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

const MainProductsTable = ({ products, searchTerm, branchValue }) => {
  const { userLogin } = useLoginContext();
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quantityInBranch = products?.map((product) =>
    product.quantityInBranch?.find(
      (product) =>
        product?.branch?._id === branchValue?.id ||
        userLogin?.user?.branch?._id === product?.branch?._id
    )
  );

  return (
    <TableContainer>
      <TableTitle>جدول المنتجات الرئيسي</TableTitle>
      <TableWrapper>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>اسم المنتج</TableHeaderCell>
              <TableHeaderCell>الكود</TableHeaderCell>
              <TableHeaderCell>العدد الحالي</TableHeaderCell>
              <TableHeaderCell>اسم الفرع</TableHeaderCell>
              <TableHeaderCell>المستلم</TableHeaderCell>
              <TableHeaderCell>تاريخ الاستلام</TableHeaderCell>
              <TableHeaderCell>العدد المستلم</TableHeaderCell>
              <TableHeaderCell>السعر ر.س</TableHeaderCell>
              <TableHeaderCell>الخصم ر.س</TableHeaderCell>
              <TableHeaderCell>الكمية</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredProducts?.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product?.name}</TableCell>
                <TableCell>{product?.code}</TableCell>
                <TableCell>{quantityInBranch[index]?.quantity}</TableCell>
                <TableCell>{quantityInBranch[index]?.branch?.name}</TableCell>
                <TableCell>
                  {quantityInBranch[index]?.receivedBy?.name}
                </TableCell>
                <TableCell>
                  {formatDateTime(quantityInBranch[index]?.receivedAt).date}
                </TableCell>
                <TableCell>
                  {quantityInBranch[index]?.quantityReceived}
                </TableCell>
                <TableCell>{product?.price}</TableCell>
                <TableCell>{product?.discount || 0}</TableCell>
                <TableCell>
                  <StatusBadge
                    status={
                      quantityInBranch[index]?.quantity >
                      quantityInBranch[index]?.quantity * 0.2
                        ? "متوفر"
                        : "قليل"
                    }
                  >
                    {quantityInBranch[index]?.quantity >
                    quantityInBranch[index]?.quantity * 0.2
                      ? "متوفر"
                      : "قليل"}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default MainProductsTable;
