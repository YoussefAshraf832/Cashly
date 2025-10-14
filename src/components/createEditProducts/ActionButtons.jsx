import React from "react";
import styled from "styled-components";
import Spinner from "../../utils/Spinner";

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  transition: all ${({ theme }) => theme.transition};
  cursor: pointer;
  border: none;
  min-width: 150px;
  &:disabled {
    cursor: no-drop;
  }

  ${({ variant, theme }) => {
    if (variant === "primary") {
      return `
        background-color: ${theme.colors.primary};
        color: white;
        box-shadow: ${theme.shadows.soft};
        
        &:hover {
          background-color: ${theme.colors.surface};
          box-shadow: ${theme.shadows.medium};
          transform: translateY(-2px);
        }
      `;
    } else if (variant === "success") {
      return `
        background-color: ${theme.colors.accent};
        color: white;
        box-shadow: ${theme.shadows.soft};
        
        &:hover {
          background-color: ${theme.colors.muted};
          box-shadow: ${theme.shadows.medium};
          transform: translateY(-2px);
        }
      `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

function ActionButtons({ onAddProduct, onSaveProducts, isLoading }) {
  return (
    <ButtonsContainer>
      <Button variant="primary" onClick={onAddProduct} disabled={isLoading}>
        ➕ منتج أخر
      </Button>
      <Button variant="success" onClick={onSaveProducts} disabled={isLoading}>
        {isLoading ? <Spinner /> : "💾 حفظ التغييرات"}
      </Button>
    </ButtonsContainer>
  );
}

export default ActionButtons;
