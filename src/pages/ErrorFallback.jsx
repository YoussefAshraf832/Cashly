import styled from "styled-components";
import { GlobalStyle, theme } from "../GlobalStyle.js";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${theme.colors.background},
    ${theme.colors.lighter}
  );
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 5rem;
  color: #e74c3c;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const ErrorTitle = styled.h1`
  font-size: ${theme.fontSizes.xxl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
  }
`;

const ErrorMessage = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.lg};
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.base};
  }
`;

const ErrorDetails = styled.details`
  margin: ${theme.spacing.lg} 0;
  max-width: 800px;
  width: 100%;
`;

const ErrorSummary = styled.summary`
  cursor: pointer;
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.lighter};
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.sm};
  font-weight: 600;
  color: ${theme.colors.text};

  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const ErrorStack = styled.pre`
  background-color: #f8f9fa;
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.sm};
  text-align: left;
  font-size: ${theme.fontSizes.xs};
  color: #666;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.lighter};
    border-radius: ${theme.borderRadius.xs};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.secondary};
    border-radius: ${theme.borderRadius.xs};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${theme.spacing.lg};

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${({ variant }) => {
    switch (variant) {
      case "secondary":
        return theme.colors.secondary;
      case "danger":
        return "#e74c3c";
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ variant }) => (variant === "secondary" ? "#333" : "white")};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.soft};
  min-width: 150px;

  &:hover {
    background-color: ${({ variant }) => {
      switch (variant) {
        case "secondary":
          return theme.colors.accent;
        case "danger":
          return "#c0392b";
        default:
          return theme?.colors.surface;
      }
    }};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const TipBox = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  max-width: 600px;

  h4 {
    color: #856404;
    margin: 0 0 ${theme.spacing.sm} 0;
    font-size: ${theme.fontSizes.base};
  }

  ul {
    color: #856404;
    text-align: right;
    margin: 0;
    padding-right: ${theme.spacing.lg};

    li {
      margin-bottom: ${theme.spacing.xs};
      font-size: ${theme.fontSizes.sm};
    }
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  const handleGoHome = () => {
    resetErrorBoundary();
    window.location.replace("/");
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleReset = () => {
    resetErrorBoundary();
  };
  return (
    <>
      <GlobalStyle />
      <Container>
        <ErrorIcon>⚠️</ErrorIcon>

        <ErrorTitle>حدث خطأ غير متوقع</ErrorTitle>

        <ErrorMessage>
          عذراً، حدث خطأ في التطبيق. نحن نعمل على حل هذه المشكلة. يمكنك المحاولة
          مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </ErrorMessage>

        <ErrorDetails>
          <ErrorSummary>عرض تفاصيل الخطأ (للمطورين)</ErrorSummary>
          <ErrorStack>
            <strong>رسالة الخطأ:</strong>
            {"\n"}
            {error?.message || "خطأ غير معروف"}
            {"\n\n"}
            <strong>مكان الخطأ:</strong>
            {"\n"}
            {error?.stack || "غير متوفر"}
          </ErrorStack>
        </ErrorDetails>

        <ButtonContainer>
          <Button onClick={handleGoHome}>🏠 الصفحة الرئيسية</Button>
          <Button variant="secondary" onClick={handleReset}>
            🔄 إعادة المحاولة
          </Button>
          <Button variant="danger" onClick={handleReload}>
            ⟳ إعادة تحميل الصفحة
          </Button>
        </ButtonContainer>

        <TipBox>
          <h4>💡 نصائح لحل المشكلة:</h4>
          <ul>
            <li>تأكد من اتصالك بالإنترنت</li>
            <li>امسح ذاكرة التخزين المؤقت للمتصفح</li>
            <li>حدث المتصفح إلى أحدث إصدار</li>
            <li>إذا استمرت المشكلة، تواصل مع الدعم الفني</li>
          </ul>
        </TipBox>
      </Container>
    </>
  );
}

export default ErrorFallback;
