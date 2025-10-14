import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: ${({ theme, size }) =>
    size === "small"
      ? `${theme.spacing.sm} ${theme.spacing.md}`
      : size === "large"
      ? `${theme.spacing.lg} ${theme.spacing.xl}`
      : `${theme.spacing.md} ${theme.spacing.lg}`};

  background: ${({ variant, theme }) => {
    switch (variant) {
      case "primary":
        return `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.surface} 100%)`;
      case "secondary":
        return `linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.accent} 100%)`;
      case "danger":
        return `linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)`;
      case "success":
        return `linear-gradient(135deg, #27ae60 0%, #229954 100%)`;
      default:
        return theme.colors.secondary;
    }
  }};

  color: ${({ variant }) => (variant === "secondary" ? "#333" : "white")};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme, size }) =>
    size === "small"
      ? theme.fontSizes.sm
      : size === "large"
      ? theme.fontSizes.lg
      : theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }

  &:active::after {
    width: 300px;
    height: 300px;
  }
`;

const Button = ({
  children,
  variant = "secondary",
  size = "medium",
  disabled = false,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
