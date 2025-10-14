import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../utils/LoadingSpinner";
import Spinner from "../utils/Spinner";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(121, 89, 52, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(121, 89, 52, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(121, 89, 52, 0);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.accent} 35%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(245, 242, 229, 0.1) 0%,
      transparent 50%
    );
    animation: ${float} 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  box-shadow: ${({ theme }) => theme.shadows.strong},
    0 0 40px rgba(121, 89, 52, 0.1);
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(121, 89, 52, 0.1);
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.accent},
      ${({ theme }) => theme.colors.secondary}
    );
    border-radius: ${({ theme }) => theme.borderRadius.xxl}
      ${({ theme }) => theme.borderRadius.xxl} 0 0;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.surface}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  font-weight: 700;
  letter-spacing: -1px;
  animation: ${slideInLeft} 0.8s ease-out 0.2s both;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  animation: ${slideInLeft} 0.8s ease-out 0.4s both;

  @media (max-width: 480px) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Form = styled.form`
  width: 100%;
  animation: ${slideInLeft} 0.8s ease-out 0.6s both;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 480px) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background: linear-gradient(white, white) padding-box,
    linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.secondary},
        ${({ theme }) => theme.colors.accent}
      )
      border-box;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transition};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.8;
  }

  &:focus {
    background: linear-gradient(
          ${({ theme }) => theme.colors.lighter},
          ${({ theme }) => theme.colors.lighter}
        )
        padding-box,
      linear-gradient(
          135deg,
          ${({ theme }) => theme.colors.primary},
          ${({ theme }) => theme.colors.surface}
        )
        border-box;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:hover:not(:focus) {
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition};
  position: relative;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.md};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.strong};
    animation: ${pulse} 1.5s infinite;

    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    animation: none;

    &::before {
      display: none;
    }
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.secondary},
      transparent
    );
  }

  span {
    padding: 0 ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.muted};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.lighter}
    );
    transition: left ${({ theme }) => theme.transition};
    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);

    &::before {
      left: 0;
    }
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const WelcomeIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  border-radius: 50%;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  animation: ${float} 3s ease-in-out infinite;
  box-shadow: ${({ theme }) => theme.shadows.medium};

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

function Login() {
  const { cookies } = useLoginContext();
  const navigate = useNavigate();

  if (cookies.jwt) {
    navigate("/home");
  }

  const [emailOrPhone, setEmailOrPhone] = useState(
    "youssefashraf832@gmail.com"
  );
  const [password, setPassword] = useState("Yy123456@");
  const { loginFunc, isLoading } = useLogin();

  const handleLogin = function (e) {
    e.preventDefault();
    loginFunc({ emailOrPhone, password });
  };

  return (
    <Container>
      <LoginCard>
        <WelcomeIcon>
          💰
          {/* 💼 */}
        </WelcomeIcon>
        <Title>مرحباً بك</Title>
        <Subtitle>سجل دخولك للوصول إلى نظام الكاشير</Subtitle>

        <Form onSubmit={handleLogin}>
          <InputGroup>
            <Input
              type="text"
              placeholder="البريد الإلكتروني او رقم المحمول"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <Button type="submit" disabled={isLoading}>
            {/* {!isLoading && <LoadingSpinner />} */}
            {isLoading ? <Spinner /> : "تسجيل الدخول"}
          </Button>
        </Form>

        {/* <Divider>
          <span>أو</span>
        </Divider>

        <SignUpButton type="button">إنشاء حساب جديد</SignUpButton> */}
      </LoginCard>
    </Container>
  );
}

export default Login;
