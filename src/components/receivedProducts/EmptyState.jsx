import React from "react";
import styled from "styled-components";

const EmptyContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  opacity: 0.5;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const EmptyMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0;
`;

const EmptyAction = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = ({ icon, message, action }) => {
  return (
    <EmptyContainer>
      {icon && <EmptyIcon>{icon}</EmptyIcon>}
      <EmptyMessage>{message}</EmptyMessage>
      {action && <EmptyAction>{action}</EmptyAction>}
    </EmptyContainer>
  );
};

export default EmptyState;
