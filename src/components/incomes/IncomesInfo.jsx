import styled from "styled-components";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Spinner from "../../utils/Spinner";

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

function IncomesInfo({ invoices, isLoading }) {
  const totalDiscount = invoices?.data?.data?.reduce((total, cur) => {
    return total + cur.totalDiscount;
  }, 0);

  const avrageSales = invoices?.data?.data?.reduce((total, cur) => {
    return total + cur.totalPrice;
  }, 0);

  const cash = invoices?.data?.data?.filter(
    (prod) => prod.paymentMethod === "cash"
  );

  const visa = invoices?.data?.data?.filter(
    (prod) => prod.paymentMethod === "visa"
  );

  return (
    <StatsGrid>
      <StatCard>
        <StatLabel>إجمالي الخصومات</StatLabel>
        {isLoading ? (
          <Spinner size="xlarge" />
        ) : (
          <StatValue>{totalDiscount} ر.س</StatValue>
        )}
      </StatCard>
      <StatCard>
        <StatLabel>عدد الفواتير (كاش)</StatLabel>
        {isLoading ? (
          <Spinner size="xlarge" />
        ) : (
          <StatValue>{cash?.length}</StatValue>
        )}
      </StatCard>
      <StatCard>
        <StatLabel>عدد الفواتير (فيزا)</StatLabel>
        {isLoading ? (
          <Spinner size="xlarge" />
        ) : (
          <StatValue>{visa?.length}</StatValue>
        )}
      </StatCard>
      <StatCard>
        <StatLabel>متوسط قيمة الفاتورة</StatLabel>
        {isLoading ? (
          <Spinner size="xlarge" />
        ) : (
          <StatValue>
            {/* {(totalSales / invoices.length).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "} */}
            {Math.trunc((avrageSales / invoices?.results) * 100) / 100 || 0} ر.س
          </StatValue>
        )}
      </StatCard>
    </StatsGrid>
  );
}

export default IncomesInfo;
