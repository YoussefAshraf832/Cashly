import styled, { keyframes } from "styled-components";

// Animations for different spinner types
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
`;

const wave = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-10px);
  }
`;

// Main Spinner Container
const SpinnerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

// Circular Spinner with gradient
const CircularSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top: 3px solid ${({ theme }) => theme.colors.lighter};
  border-right: 3px solid rgba(255, 255, 255, 0.3);
  animation: ${spin} 1s linear infinite;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top: 3px solid rgba(255, 255, 255, 0.1);
    animation: ${spin} 2s linear infinite reverse;
  }
`;

// Dots Spinner
const DotsSpinner = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.lighter};
  border-radius: 50%;
  animation: ${bounce} 1.4s ease-in-out infinite both;
  animation-delay: ${(props) => props.delay || "0s"};
`;

// Pulse Spinner
const PulseSpinner = styled.div`
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.lighter};
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: inherit;
    animation: ${pulse} 1.5s ease-in-out infinite;
  }

  &::before {
    animation-delay: -0.5s;
  }

  &::after {
    animation-delay: -1s;
  }
`;

// Wave Spinner
const WaveSpinner = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const WaveBar = styled.div`
  width: 3px;
  height: 16px;
  background: ${({ theme }) => theme.colors.lighter};
  border-radius: 2px;
  animation: ${wave} 1.2s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

// Gradient Ring Spinner
const GradientRingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent,
    ${({ theme }) => theme.colors.lighter},
    transparent
  );
  animation: ${spin} 1s linear infinite;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }
`;

// Coffee Cup Spinner (themed for cashier app)
const CoffeeSpinner = styled.div`
  width: 20px;
  height: 20px;
  position: relative;

  &::before {
    content: "☕";
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${spin} 2s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid transparent;
    border-top: 2px solid ${({ theme }) => theme.colors.lighter};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

// Main LoadingSpinner Component
const LoadingSpinner = ({ type = "circular", size = "medium" }) => {
  const sizeMap = {
    small: "16px",
    medium: "20px",
    large: "24px",
  };

  const SpinnerWrapper = styled(SpinnerContainer)`
    width: ${sizeMap[size]};
    height: ${sizeMap[size]};
  `;

  const renderSpinner = () => {
    switch (type) {
      case "dots":
        return (
          <DotsSpinner>
            <Dot delay="0s" />
            <Dot delay="0.16s" />
            <Dot delay="0.32s" />
          </DotsSpinner>
        );

      case "pulse":
        return <PulseSpinner />;

      case "wave":
        return (
          <WaveSpinner>
            <WaveBar delay="0s" />
            <WaveBar delay="0.1s" />
            <WaveBar delay="0.2s" />
            <WaveBar delay="0.3s" />
          </WaveSpinner>
        );

      case "gradient":
        return <GradientRingSpinner />;

      case "coffee":
        return <CoffeeSpinner />;

      case "circular":
      default:
        return <CircularSpinner />;
    }
  };

  return <SpinnerWrapper>{renderSpinner()}</SpinnerWrapper>;
};

export default LoadingSpinner;
