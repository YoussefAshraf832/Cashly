import styled from "styled-components";
import { useAccountsContext } from "../../context/AccountsContext";
import { formatDateTime } from "../../utils/formatDateTime";
import Spinner, { ButtonSpinner } from "../../utils/Spinner";

const CollapsibleTable = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  height: ${({ open }) => (open ? "450px" : "auto")};
  transition: height 0.3s ease;

  @media (max-width: 768px) {
    height: ${({ open }) => (open ? "400px" : "auto")};
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  flex-shrink: 0;
`;

const TableTitle = styled.h3`
  margin: 0;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TableContainer = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-height: 0;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  min-height: 0;

  /* تخصيص شكل الـ scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
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
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  @media (max-width: 768px) {
    min-width: 500px;
  }
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.lighter};
  position: sticky;
  top: 0;
  z-index: 10;

  /* إضافة ظل خفيف للهيدر */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lighter};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transition: background-color 0.2s ease;
  }
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  white-space: nowrap;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 200px;

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

function AccountsTables({ expensesInvoicesActive, isLoading }) {
  const {
    setIsInvoicesTableOpen,
    isInvoicesTableOpen,
    setIsExpensesTableOpen,
    isExpensesTableOpen,
  } = useAccountsContext();

  const { expenses, invoices } = expensesInvoicesActive?.data || {};

  return (
    <>
      <CollapsibleTable open={isInvoicesTableOpen}>
        <TableHeader
          onClick={() => setIsInvoicesTableOpen(!isInvoicesTableOpen)}
        >
          <TableTitle>
            الفواتير المباعة (
            {isLoading ? <Spinner size="small" /> : invoices?.length || 0})
          </TableTitle>
          <ToggleButton>{isInvoicesTableOpen ? "▲" : "▼"}</ToggleButton>
        </TableHeader>
        <TableContainer isOpen={isInvoicesTableOpen}>
          <TableContent>
            {invoices?.length > 0 ? (
              <ScrollContainer>
                <Table>
                  <TableHead>
                    <tr>
                      <TableHeaderCell>كود الفاتورة</TableHeaderCell>
                      <TableHeaderCell>التاريخ</TableHeaderCell>
                      <TableHeaderCell>الوقت</TableHeaderCell>
                      <TableHeaderCell>الفرع</TableHeaderCell>
                      <TableHeaderCell>الخصم</TableHeaderCell>
                      <TableHeaderCell>الإجمالي</TableHeaderCell>
                    </tr>
                  </TableHead>
                  <tbody>
                    {invoices?.map((invoice) => (
                      <TableRow key={invoice._id}>
                        <TableCell>{invoice.code}</TableCell>
                        <TableCell>
                          {formatDateTime(invoice.createdAt).date}
                        </TableCell>
                        <TableCell>
                          {formatDateTime(invoice.createdAt).time}
                        </TableCell>
                        <TableCell>{invoice.branch.name}</TableCell>
                        <TableCell>{invoice.totalDiscount} ر.س</TableCell>
                        <TableCell>{invoice.totalPrice} ر.س</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </ScrollContainer>
            ) : (
              <EmptyState>
                <p>لا توجد فواتير للمستخدم المحدد</p>
              </EmptyState>
            )}
          </TableContent>
        </TableContainer>
      </CollapsibleTable>

      <CollapsibleTable open={isExpensesTableOpen}>
        <TableHeader
          onClick={() => setIsExpensesTableOpen(!isExpensesTableOpen)}
        >
          <TableTitle>
            المصروفات (
            {isLoading ? <Spinner size="small" /> : expenses?.length || 0})
          </TableTitle>
          <ToggleButton>{isExpensesTableOpen ? "▲" : "▼"}</ToggleButton>
        </TableHeader>
        <TableContainer isOpen={isExpensesTableOpen}>
          <TableContent>
            {expenses?.length > 0 ? (
              <ScrollContainer>
                <Table>
                  <TableHead>
                    <tr>
                      <TableHeaderCell>النوع</TableHeaderCell>
                      <TableHeaderCell>التاريخ</TableHeaderCell>
                      <TableHeaderCell>الوقت</TableHeaderCell>
                      <TableHeaderCell>المبلغ</TableHeaderCell>
                      <TableHeaderCell>الوصف</TableHeaderCell>
                    </tr>
                  </TableHead>
                  <tbody>
                    {expenses?.map((expense) => (
                      <TableRow key={expense._id}>
                        <TableCell>{expense.filter}</TableCell>
                        <TableCell>
                          {formatDateTime(expense.createdAt).date}
                        </TableCell>
                        <TableCell>
                          {formatDateTime(expense.createdAt).time}
                        </TableCell>
                        <TableCell>{expense.totalPrice} ر.س</TableCell>
                        <TableCell>{expense.description}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </ScrollContainer>
            ) : (
              <EmptyState>
                <p>لا توجد فواتير للمستخدم المحدد</p>
              </EmptyState>
            )}
          </TableContent>
        </TableContainer>
      </CollapsibleTable>
    </>
  );
}

export default AccountsTables;
