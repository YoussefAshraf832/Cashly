import styled from "styled-components";
import Spinner from "../../utils/Spinner";

const TotalSalesSection = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const TotalSalesValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

function TotalSales({ invoices, isLoading }) {
  return (
    <TotalSalesSection>
      <SectionTitle>إجمالي المبيعات</SectionTitle>
      {isLoading ? (
        <Spinner size="xlarge" />
      ) : (
        <TotalSalesValue>
          {invoices?.data?.data?.reduce((total, invoice) => {
            return total + invoice.totalPrice;
          }, 0)}{" "}
          ر.س
        </TotalSalesValue>
      )}
      <StatLabel>قيمة المبيعات الإجمالية من جميع الفواتير</StatLabel>
    </TotalSalesSection>
  );
}

export default TotalSales;
