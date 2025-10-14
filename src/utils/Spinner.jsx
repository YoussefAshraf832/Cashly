import styled, { keyframes } from "styled-components";

// Animation for the spinner
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Base Spinner Component
const BaseSpinner = styled.div`
  border: ${({ size, thickness = 2 }) => thickness}px solid
    ${({ theme, color }) => color || theme.colors.secondary};
  border-top: ${({ size, thickness = 2 }) => thickness}px solid
    ${({ theme, primaryColor }) => primaryColor || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  display: inline-block;

  /* Size variants */
  ${({ size = "medium" }) => {
    switch (size) {
      case "small":
        return `
          width: 16px;
          height: 16px;
        `;
      case "medium":
        return `
          width: 24px;
          height: 24px;
        `;
      case "large":
        return `
          width: 32px;
          height: 32px;
        `;
      case "xlarge":
        return `
          width: 48px;
          height: 48px;
        `;
      default:
        return `
          width: ${typeof size === "number" ? size + "px" : "24px"};
          height: ${typeof size === "number" ? size + "px" : "24px"};
        `;
    }
  }}
`;

// Page Spinner - للاستخدام في تحميل الصفحات الكاملة
export const PageSpinner = styled(BaseSpinner).attrs({
  size: "xlarge",
})`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

// Container Spinner - للاستخدام داخل الحاويات
export const ContainerSpinner = styled(BaseSpinner).attrs({
  size: "large",
})`
  margin: 0 auto;
  display: block;
`;

// Button Spinner - للاستخدام داخل الأزرار
export const ButtonSpinner = styled(BaseSpinner).attrs({
  size: "small",
})`
  margin-right: 8px;
`;

// Spinner Component مع جميع الخيارات
const Spinner = ({
  size = "medium",
  color,
  primaryColor,
  thickness = 2,
  className,
  ...props
}) => {
  return (
    <BaseSpinner
      size={size}
      color={color}
      primaryColor={primaryColor}
      thickness={thickness}
      className={className}
      {...props}
    />
  );
};

export default Spinner;
