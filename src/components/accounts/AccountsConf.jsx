import styled from "styled-components";
import { useAccountsContext } from "../../context/AccountsContext";
import { ButtonPrimary, ButtonSecondary } from "../../utils/Buttons";
import { useUpdateActiveExpenseInvoice } from "../../hooks/expenses/useUpdateActiveExpenseInvoice";
import { useLoginContext } from "../../context/LoginContext";
import Spinner from "../../utils/Spinner";

const SummarySection = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const SummaryCard = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.lighter};
  text-align: center;
`;

const SummaryValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const DeliverySection = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

function AccountsConf({ expensesInvoicesActive, isLoading }) {
  const {
    // totalSales,
    // totalExpenses,
    // netAmount,
    confirmDelivery,
    showConfirmation,
    setShowConfirmation,
    handleDelivery,
    searchFilter,
  } = useAccountsContext();

  const { cookies } = useLoginContext();
  const { expenses, invoices } = expensesInvoicesActive?.data || {
    expenses: [],
    invoices: [],
  };

  const { updateActiveExpenseInvoiceFunc, isLoading: isLoadingUpdate } =
    useUpdateActiveExpenseInvoice(setShowConfirmation);

  const totalSales = invoices?.reduce((total, invoice) => {
    return total + invoice.totalPrice;
  }, 0);

  const totalExpenses = expenses?.reduce((total, expense) => {
    return total + expense.totalPrice;
  }, 0);

  const total = totalSales - totalExpenses;

  return (
    <>
      <SummarySection>
        <SummaryCard>
          <SummaryLabel>إجمالي المبيعات</SummaryLabel>
          {isLoading ? (
            <Spinner size="xlarge" />
          ) : (
            <SummaryValue>{totalSales?.toLocaleString() || 0} ر.س</SummaryValue>
          )}
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>إجمالي المصروفات</SummaryLabel>
          {isLoading ? (
            <Spinner size="xlarge" />
          ) : (
            <SummaryValue>
              {totalExpenses?.toLocaleString() || 0} ر.س
            </SummaryValue>
          )}
        </SummaryCard>
      </SummarySection>

      <DeliverySection>
        <SectionTitle>التسليم</SectionTitle>
        {
          <p style={{ marginBottom: "14px", fontSize: "25px" }}>
            {isLoading ? (
              <Spinner size="xlarge" />
            ) : (
              `صافي المبلغ:
            ${
              invoices?.length === 0 && expenses?.length === 0
                ? 0
                : total?.toLocaleString()
            } ر.س`
            )}
          </p>
        }
        <ButtonPrimary onClick={confirmDelivery}>تسليم الحسابات</ButtonPrimary>
      </DeliverySection>

      <ModalOverlay show={showConfirmation}>
        <ModalContent>
          <h2>تأكيد التسليم</h2>
          <p>هل أنت متأكد من أنك تريد تسليم الحسابات للمدير؟</p>
          <p>لا يمكن تعديل البيانات بعد التسليم.</p>
          <ModalButtons>
            <ButtonPrimary
              onClick={() =>
                updateActiveExpenseInvoiceFunc({
                  emailOrPhone: searchFilter,
                  cookies,
                  bodyObj: { expenses, invoices },
                })
              }
            >
              نعم، تأكيد التسليم
            </ButtonPrimary>
            <ButtonSecondary onClick={() => handleDelivery(false)}>
              إلغاء
            </ButtonSecondary>
          </ModalButtons>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

export default AccountsConf;
