import styled from "styled-components";
import ExpensesForm from "./ExpensesForm";
import ExpensesTable from "./ExpensesTable";
import { useLoginContext } from "../../context/LoginContext";
import { useAllExpenses } from "../../hooks/expenses/useAllExpenses";
import { PageSpinner } from "../../utils/Spinner";
import toast from "react-hot-toast";

const ExpensesContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  /* max-width: 1200px;
  margin: 0 auto; */
  grid-area: express;

  overflow-y: auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: flex-start;
  }
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

const Expenses = () => {
  const { cookies, userLogin } = useLoginContext();
  const { isLoading, expenses, error } = useAllExpenses(cookies);

  if (isLoading) return <PageSpinner />;

  if (error) toast.error(error.message);

  return (
    <ExpensesContainer>
      <PageHeader>
        <PageTitle>المصروفات</PageTitle>
        {/* <div>
          <Button>طباعة التقرير</Button>
        </div> */}
      </PageHeader>

      <ExpensesForm />

      <ExpensesTable
        cookies={cookies}
        userLogin={userLogin}
        expenses={expenses}
      />
    </ExpensesContainer>
  );
};

export default Expenses;
