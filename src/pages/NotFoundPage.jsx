// NotFoundPage.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.lighter} 100%
  );
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 6rem;
  }

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.lg} 0
    ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ variant, theme }) =>
    variant === "secondary" ? theme.colors.secondary : theme.colors.primary};
  color: ${({ variant }) => (variant === "secondary" ? "#333" : "white")};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  min-width: 150px;

  &:hover {
    background-color: ${({ variant, theme }) =>
      variant === "secondary" ? theme.colors.accent : theme.colors.surface};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const IconContainer = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const CountdownText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-style: italic;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  // التوجيه التلقائي للصفحة الرئيسية بعد 10 ثوانٍ
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/home", { replace: true });
  };

  const handleGoBack = () => {
    // التحقق من وجود تاريخ في المتصفح
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home", { replace: true });
    }
  };

  return (
    <Container>
      <IconContainer>🔍</IconContainer>

      <ErrorCode>404</ErrorCode>

      <ErrorTitle>الصفحة غير موجودة</ErrorTitle>

      <ErrorMessage>
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر. يمكنك
        العودة إلى الصفحة الرئيسية أو المحاولة مرة أخرى.
      </ErrorMessage>

      <ButtonContainer>
        <Button onClick={handleGoHome}>🏠 الصفحة الرئيسية</Button>
        <Button variant="secondary" onClick={handleGoBack}>
          ↩️ العودة للخلف
        </Button>
      </ButtonContainer>

      <CountdownText>
        سيتم توجيهك تلقائياً للصفحة الرئيسية خلال 10 ثوانٍ
      </CountdownText>
    </Container>
  );
};

export default NotFoundPage;
