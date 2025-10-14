import React, { useState } from "react";
import styled from "styled-components";
import { useLoginContext } from "../../context/LoginContext";

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr auto;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  align-items: center;
  transition: all ${({ theme }) => theme.transition};

  &:hover {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.lighter} 0%,
      rgba(255, 255, 255, 0.8) 100%
    );
    transform: translateX(2px);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1.5fr 0.8fr 1fr;
    padding: ${({ theme }) => theme.spacing.md};

    .action-cell {
      display: none;
    }
  }
`;

const InputField = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid
    ${({ theme, hasError }) => (hasError ? "#e74c3c" : theme.colors.secondary)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  width: 100%;
  transition: all ${({ theme }) => theme.transition};
  background-color: white;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? "#e74c3c" : theme.colors.primary};
    box-shadow: ${({ theme, hasError }) =>
      hasError ? "0 0 0 3px rgba(231, 76, 60, 0.1)" : theme.shadows.accent};
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

// Custom Dropdown Components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid
    ${({ theme, hasError }) => (hasError ? "#e74c3c" : theme.colors.secondary)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: white;
  text-align: right;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${({ theme }) => theme.transition};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? "#e74c3c" : theme.colors.primary};
    box-shadow: ${({ theme, hasError }) =>
      hasError ? "0 0 0 3px rgba(231, 76, 60, 0.1)" : theme.shadows.accent};
    transform: translateY(-1px);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const DropdownArrow = styled.span`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s;
  font-size: 12px;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.sm}
    ${({ theme }) => theme.borderRadius.sm};
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* تخصيص شكل الـ scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.lighter};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const DropdownItem = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lighter};
  text-align: right;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighter};
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const RemoveBtn = styled.button`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

// Custom Dropdown Component
const BranchDropdown = ({ value, onChange, branches, hasError }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedBranch = branches?.find((branch) => branch.id === value);

  const handleSelect = (branch) => {
    onChange(branch?.id);
    setIsOpen(false);
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton type="button" onClick={handleToggle} hasError={hasError}>
        <span>{selectedBranch ? selectedBranch.value : "اختر الفرع"}</span>
        <DropdownArrow isOpen={isOpen}>▼</DropdownArrow>
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {branches?.map((branch) => (
            <DropdownItem
              key={branch.id}
              onClick={() => handleSelect(branch)}
              className={value === branch.value ? "selected" : ""}
            >
              {branch.value}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const ProductRow = ({ product, errors, onUpdate, onRemove, branches }) => {
  const handleChange = (field, value) => {
    onUpdate(product.id, field, value);
  };

  const { userLogin } = useLoginContext();

  return (
    <RowContainer>
      <div>
        <InputField
          type="text"
          placeholder="كود المنتج"
          value={product.code}
          onChange={(e) => handleChange("code", e.target.value)}
          hasError={!!errors?.code}
        />
        {errors?.code && <ErrorMessage>{errors.code}</ErrorMessage>}
      </div>

      {/* <div>
        <InputField
          type="text"
          placeholder="اسم المنتج"
          value={product.name}
          onChange={(e) => handleChange("name", e.target.value)}
          hasError={!!errors?.name}
        />
        {errors?.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </div> */}

      <div>
        <InputField
          type="number"
          placeholder="الكمية"
          min="1"
          value={product.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          hasError={!!errors?.quantity}
        />
        {errors?.quantity && <ErrorMessage>{errors.quantity}</ErrorMessage>}
      </div>

      <div>
        <BranchDropdown
          value={product.branch}
          onChange={(value) => handleChange("branch", value)}
          branches={branches}
          hasError={!!errors?.branch}
        />
        {errors?.branch && <ErrorMessage>{errors.branch}</ErrorMessage>}
      </div>

      <div className="action-cell">
        <RemoveBtn onClick={() => onRemove(product.id)} title="حذف المنتج">
          ×
        </RemoveBtn>
      </div>
    </RowContainer>
  );
};

export default ProductRow;
