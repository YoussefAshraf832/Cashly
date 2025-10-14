import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  flex: 1;
  overflow: hidden;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr auto;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  color: white;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 3px solid ${({ theme }) => theme.colors.accent};

  @media (max-width: 768px) {
    grid-template-columns: 1.5fr 0.8fr 1fr;
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.sm};

    .action-header {
      display: none;
    }
  }
`;

const TableBody = styled.div`
  overflow-y: auto;
  flex: 1;
  max-height: 60vh;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.lighter};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductTable = ({ children, headerCells, tableBodyRef }) => {
  return (
    <TableContainer>
      <TableHeader>
        {headerCells.map((cell, index) => (
          <div key={index} className={cell.className || ""}>
            {cell.content}
          </div>
        ))}
      </TableHeader>
      <TableBody ref={tableBodyRef}>{children}</TableBody>
    </TableContainer>
  );
};

export default ProductTable;
