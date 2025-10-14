import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useHomeContext } from "../../context/HomeContext";
import { useLoginContext } from "../../context/LoginContext";
import { useCreateInvoice } from "../../hooks/invoices/useCreateInvoice";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Spinner from "../../utils/Spinner";

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
  box-shadow: ${({ theme }) => theme.shadows.strong};
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  justify-content: center;
`;

const PaymentMethodButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid
    ${(props) =>
      props.active
        ? ({ theme }) => theme.colors.primary
        : ({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${(props) =>
    props.active ? ({ theme }) => theme.colors.primary : "transparent"};
  color: ${(props) =>
    props.active ? "white" : ({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.active
        ? ({ theme }) => theme.colors.primary
        : ({ theme }) => theme.colors.secondary};
    color: ${(props) =>
      props.active ? "white" : ({ theme }) => theme.colors.text};
  }
`;

const CashPaymentSection = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const VisaPaymentSection = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const OtherPaymentSection = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
`;

const AmountInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.lighter};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
    font-weight: bold;
    border-top: 1px solid ${({ theme }) => theme.colors.secondary};
    padding-top: ${({ theme }) => theme.spacing.xs};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }
`;

const PaymentConfirmationModal = ({ show, onClose, totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashAmount, setCashAmount] = useState("");
  const [otherPaymentEnabled, setOtherPaymentEnabled] = useState(false);
  const { completePurchase, invoiceItems, selectedBranch } = useHomeContext();
  const { cookies, userLogin } = useLoginContext();
  const { createInvoiceFunc, isLoading } = useCreateInvoice(
    onClose,
    completePurchase,
    setCashAmount,
    `تم تأكيد عملية الدفع بطريقة ${paymentMethod}`
  );

  const branchId = userLogin?.user?.branch?._id || selectedBranch;

  // حساب المبلغ المتبقي
  const remainingAmount = cashAmount
    ? (parseFloat(cashAmount) - totalAmount).toFixed(2)
    : 0;

  // معالجة تأكيد الدفع
  const handleConfirmPayment = () => {
    // هنا يمكن إضافة منطق معالجة الدفع

    createInvoiceFunc({
      products: invoiceItems,
      cookies,
      branchId,
      paymentMethod,
    });

    // toast.success(`تم تأكيد عملية الدفع بطريقة ${paymentMethod}`);
  };

  // معالجة إلغاء العملية
  const handleCancel = () => {
    setPaymentMethod("cash");
    setCashAmount("");
    setOtherPaymentEnabled(false);
    onClose();
  };

  return (
    <ModalOverlay show={show}>
      <ModalContent>
        <ModalTitle>تأكيد عملية البيع</ModalTitle>

        <AmountInfo>
          <AmountRow>
            <span>إجمالي الفاتورة:</span>
            <span>{totalAmount?.toLocaleString()} ر.س</span>
          </AmountRow>
        </AmountInfo>

        <div>
          <Label>طريقة الدفع:</Label>
          <PaymentMethods>
            <PaymentMethodButton
              active={paymentMethod === "cash"}
              onClick={() => setPaymentMethod("cash")}
            >
              كاش
            </PaymentMethodButton>
            <PaymentMethodButton
              active={paymentMethod === "visa"}
              onClick={() => setPaymentMethod("visa")}
            >
              فيزا
            </PaymentMethodButton>
            <PaymentMethodButton
              active={paymentMethod === "other"}
              onClick={() => setPaymentMethod("other")}
            >
              أخرى
            </PaymentMethodButton>
          </PaymentMethods>
        </div>

        {/* قسم الدفع نقداً */}
        <CashPaymentSection show={paymentMethod === "cash"}>
          <InputGroup>
            <Label>المبلغ المدفوع:</Label>
            <Input
              type="number"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              placeholder="أدخل المبلغ المدفوع"
              min={totalAmount}
            />
          </InputGroup>

          {cashAmount && (
            <AmountInfo>
              <AmountRow>
                <span>المبلغ المدفوع:</span>
                <span>{parseFloat(cashAmount).toLocaleString()} ر.س</span>
              </AmountRow>
              <AmountRow>
                <span>المبلغ المتبقي:</span>
                <span>{remainingAmount} ر.س</span>
              </AmountRow>
            </AmountInfo>
          )}
        </CashPaymentSection>

        {/* قسم الدفع بالفيزا */}
        <VisaPaymentSection show={paymentMethod === "visa"}>
          <p>سيتم خصم المبلغ من البطاقة الائتمانية</p>
          <AmountInfo>
            <AmountRow>
              <span>المبلغ الذي سيتم خصمه:</span>
              <span>{totalAmount?.toLocaleString()} ر.س</span>
            </AmountRow>
          </AmountInfo>
        </VisaPaymentSection>

        {/* قسم الدفع الأخرى */}
        <OtherPaymentSection show={paymentMethod === "other"}>
          <InputGroup>
            <Label>
              <input
                type="checkbox"
                checked={otherPaymentEnabled}
                onChange={(e) => setOtherPaymentEnabled(e.target.checked)}
                style={{ marginLeft: ({ theme }) => theme.spacing.sm }}
              />
              تم تفعيل طريقة الدفع الأخرى
            </Label>
          </InputGroup>

          {otherPaymentEnabled && (
            <AmountInfo>
              <AmountRow>
                <span>المبلغ المستحق:</span>
                <span>{totalAmount.toLocaleString()} ر.س</span>
              </AmountRow>
            </AmountInfo>
          )}
        </OtherPaymentSection>

        <ButtonGroup>
          <CancelButton onClick={handleCancel}>إلغاء</CancelButton>
          <ConfirmButton
            onClick={handleConfirmPayment}
            disabled={
              (paymentMethod === "cash" &&
                (!cashAmount || parseFloat(cashAmount) < totalAmount)) ||
              (paymentMethod === "other" && !otherPaymentEnabled) ||
              isLoading
            }
          >
            {!isLoading ? "تأكيد الدفع" : <Spinner />}
          </ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PaymentConfirmationModal;
