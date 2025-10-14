import styled from "styled-components";
import { useHomeContext } from "../../context/HomeContext";

import InvoiceItem from "./InvoiceItem";
import PaymentConfirmationModal from "./PaymentConfarm";
import { useState } from "react";

const InvoiceSection = styled.section`
  grid-area: invoice;
  background-color: ${({ theme }) => theme.colors.lighter};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: ${({ theme }) => theme.transition};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    overflow-x: scroll;
    height: 40vh;
    margin-top: auto;
  }
`;

const InvoiceTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  flex-shrink: 0;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0; /* مهم لتمكين التمرير في Flexbox */

  @media (max-width: 768px) {
    overflow: hidden;
    overflow-x: scroll;
  }
`;

const InvoiceItems = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  /* تخصيص شريط التمرير */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.lighter};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const FixedFooter = styled.div`
  margin-top: auto;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.lighter};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const InvoiceTotal = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button`
  background-color: ${({ theme, secondary }) =>
    secondary ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.lighter};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  width: 100%;

  &:hover {
    background-color: ${({ theme, secondary }) =>
      secondary ? theme.colors.accent : theme.colors.surface};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

function Invoice() {
  const { invoiceItems, calculateTotal, setInvoiceItems } = useHomeContext();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <InvoiceSection>
      <InvoiceTitle>الفاتورة</InvoiceTitle>

      <ScrollContainer>
        <InvoiceItems>
          {invoiceItems?.length === 0 ? (
            <p>لا توجد عناصر في الفاتورة</p>
          ) : (
            invoiceItems?.map((item) => (
              <InvoiceItem key={item.id} item={item} />
            ))
          )}
        </InvoiceItems>
      </ScrollContainer>

      <FixedFooter>
        {invoiceItems?.length > 0 && (
          <InvoiceTotal>
            <span>الإجمالي:</span>
            <span>{Math.round(calculateTotal() * 100) / 100} ريال</span>
          </InvoiceTotal>
        )}

        <ActionButtonsContainer>
          <ActionButton
            onClick={() => setShowPaymentModal(true)}
            disabled={invoiceItems?.length === 0}
          >
            إتمام الشراء
          </ActionButton>
          <ActionButton
            onClick={() => setInvoiceItems([])}
            disabled={invoiceItems?.length === 0}
            secondary
          >
            إلغاء
          </ActionButton>
        </ActionButtonsContainer>
      </FixedFooter>

      <PaymentConfirmationModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        totalAmount={calculateTotal()}
      />
    </InvoiceSection>
  );
}

export default Invoice;
