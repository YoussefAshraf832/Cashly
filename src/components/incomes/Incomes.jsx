import styled from "styled-components";
import IncomesInfo from "./IncomesInfo";
import InvoiceSearch from "./InvoiceSearch";
import IncomesTables from "./IncomesTables";
import TotalSales from "./TotalSales";
import DateRangeFilter from "./DateRangeFilter";
import { useLoginContext } from "../../context/LoginContext";
import { useIncomesContext } from "../../context/IncomesContext";
import { useAllInvoices } from "../../hooks/invoices/useGetAllInvoices";
import toast from "react-hot-toast";
import { PageSpinner } from "../../utils/Spinner";

const SalesContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  /* max-width: 1400px;
  margin: 0 auto; */
  grid-area: incomes;
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

const Incomes = () => {
  const { cookies, userLogin } = useLoginContext();
  const { dateRange, branchFilter, searchText } = useIncomesContext();

  const to = dateRange.endDate;
  const from = dateRange.startDate;
  const branchId = userLogin?.user?.branch?._id || branchFilter;

  const {
    isLoading: isLoadingInvoices,
    invoices,
    error: errInvoices,
  } = useAllInvoices({
    cookies,
    branchId,
    startDate: from,
    endDate: to,
    emailOrPhone: searchText,
  });

  // if (isLoadingInvoices) return <PageSpinner />;

  if (errInvoices) toast.error((err) => errInvoices.message);

  return (
    <SalesContainer>
      <PageHeader>
        <PageTitle>تقارير المبيعات والفواتير</PageTitle>
      </PageHeader>

      <DateRangeFilter isLoading={isLoadingInvoices} />

      <IncomesInfo invoices={invoices} isLoading={isLoadingInvoices} />

      <InvoiceSearch invoices={invoices} isLoading={isLoadingInvoices} />

      <IncomesTables invoices={invoices} isLoading={isLoadingInvoices} />

      <TotalSales invoices={invoices} isLoading={isLoadingInvoices} />
    </SalesContainer>
  );
};

export default Incomes;
