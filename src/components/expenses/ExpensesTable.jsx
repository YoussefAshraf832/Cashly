import styled from "styled-components";
import { useExpensesContext } from "../../context/ExpensesContext";
import { formatDateTime } from "../../utils/formatDateTime";
import { useDeleteExpense } from "../../hooks/expenses/useDeleteExpense";
import Spinner from "../../utils/Spinner";

const ExpensesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  max-height: 600px;
  min-height: 300px;

  @media (max-width: 768px) {
    height: 60vh;
    max-height: 500px;
  }
`;

const ExpensesList = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  min-height: 0;

  /* تخصيص شكل الـ scrollbar - نفس الاستايل من الجدول الأول */
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

const StyledExpensesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  @media (max-width: 768px) {
    min-width: 500px;
  }
`;

const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;

  /* إضافة ظل خفيف للهيدر - نفس الاستايل من الجدول الأول */
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
  color: white;

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

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  margin-right: ${({ theme }) => theme.spacing.xs};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const EditButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.lighter};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  position: sticky;
  bottom: 0;
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};
  color: ${(props) => (props.active ? "white" : props.theme.colors.primary)};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
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

const ActionsCell = styled(TableCell)`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
    white-space: normal;
  }
`;

function ExpensesTable({ cookies, userLogin, expenses }) {
  const { setFilter, filter, expenseTypes } = useExpensesContext();

  const { deleteExpenseFunc, isLoading: isLoadingDeleting } =
    useDeleteExpense();

  const filteredExpenses =
    filter === "all"
      ? expenses?.data?.data
      : expenses?.data?.data?.filter((expense) => expense.filter === filter);

  const total = filteredExpenses?.reduce((total, expense) => {
    return total + expense.totalPrice;
  }, 0);

  return (
    <ExpensesContainer>
      <h2>سجل المصروفات</h2>

      <FilterSection>
        <FilterButton
          onClick={() => setFilter("all")}
          active={filter === "all"}
        >
          الكل
        </FilterButton>
        {expenseTypes?.map((type) => (
          <FilterButton
            key={type}
            onClick={() => setFilter(type)}
            active={filter === type}
          >
            {type}
          </FilterButton>
        ))}
      </FilterSection>

      {
        <ExpensesList>
          {filteredExpenses?.length > 0 ? (
            <>
              <TableContainer>
                <StyledExpensesTable>
                  <TableHeader>
                    <tr>
                      <TableHeaderCell>المبلغ</TableHeaderCell>
                      <TableHeaderCell>النوع</TableHeaderCell>
                      {["owner", "admin"].includes(userLogin?.user?.role) && (
                        <TableHeaderCell>الفرع</TableHeaderCell>
                      )}
                      <TableHeaderCell>التاريخ</TableHeaderCell>
                      <TableHeaderCell>الوصف</TableHeaderCell>
                      <TableHeaderCell>الإجراءات</TableHeaderCell>
                    </tr>
                  </TableHeader>
                  <tbody>
                    {filteredExpenses?.map((expense) => (
                      <TableRow key={expense._id}>
                        <TableCell>
                          {expense.totalPrice.toLocaleString()} ر.س
                        </TableCell>
                        <TableCell>{expense.filter}</TableCell>
                        {["owner", "admin"].includes(userLogin?.user?.role) && (
                          <TableCell>{expense.branch.name}</TableCell>
                        )}
                        <TableCell>
                          {formatDateTime(expense.createdAt).date}
                        </TableCell>
                        <TableCell>{expense.description}</TableCell>
                        {expense.active ? (
                          <ActionsCell>
                            <DeleteButton
                              onClick={() =>
                                deleteExpenseFunc({ id: expense._id, cookies })
                              }
                            >
                              {isLoadingDeleting ? (
                                <Spinner size="small" />
                              ) : (
                                "حذف"
                              )}
                            </DeleteButton>
                          </ActionsCell>
                        ) : (
                          <TableCell></TableCell>
                        )}
                      </TableRow>
                    ))}
                  </tbody>
                </StyledExpensesTable>
              </TableContainer>
              <TotalSection>
                الإجمالي: {total.toLocaleString()} ر.س
              </TotalSection>
            </>
          ) : (
            <EmptyState>
              <p>لا توجد مصروفات مسجلة</p>
            </EmptyState>
          )}
        </ExpensesList>
      }
    </ExpensesContainer>
  );
}

export default ExpensesTable;
