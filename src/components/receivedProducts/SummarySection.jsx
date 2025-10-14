import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.lighter} 0%,
    white 100%
  );
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  position: sticky;
  bottom: 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StatsContainer = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SummarySection = ({ statistics, actions, isLoading }) => {
  return (
    <SummaryContainer>
      <StatsContainer>
        <span>إجمالي المنتجات: {statistics.totalProducts}</span>
        <span>إجمالي الكمية: {statistics.totalQuantity}</span>
        <span>المنتجات الصحيحة: {statistics.validProducts}</span>
      </StatsContainer>

      <ActionsContainer>
        {actions?.map((action, index) =>
          React.cloneElement(action, {
            key: index,
            disabled: action.props.disabled || isLoading,
          })
        )}
      </ActionsContainer>
    </SummaryContainer>
  );
};

export default SummarySection;
