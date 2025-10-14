import styled from "styled-components";
import AccountsFilter from "./AccountsFilter";
import AccountsSearch from "./AccountsSearch";
import AccountsTables from "./AccountsTables";
import AccountsConf from "./AccountsConf";
import { useLoginContext } from "../../context/LoginContext";
import { useAccountsContext } from "../../context/AccountsContext";
import { useAllExpensesInvoicesActive } from "../../hooks/expenses/useAllActiveInvsExpen";
import toast from "react-hot-toast";

const DeliveriesContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  /* max-width: 1400px;
  margin: 0 auto; */
  grid-area: accounts;
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

const Accounts = () => {
  const { cookies } = useLoginContext();
  const { searchFilter } = useAccountsContext();

  const { isLoading, expensesInvoicesActive, error } =
    useAllExpensesInvoicesActive(cookies, searchFilter);

  if (error) toast.error(error.message);

  return (
    <DeliveriesContainer>
      <PageHeader>
        <PageTitle>صفحة التسليمات وإقفال الحسابات</PageTitle>
      </PageHeader>

      <AccountsFilter />

      <AccountsSearch expensesInvoicesActive={expensesInvoicesActive} />

      <AccountsTables
        expensesInvoicesActive={expensesInvoicesActive}
        isLoading={isLoading}
      />

      <AccountsConf
        expensesInvoicesActive={expensesInvoicesActive}
        isLoading={isLoading}
      />
    </DeliveriesContainer>
  );
};

export default Accounts;
