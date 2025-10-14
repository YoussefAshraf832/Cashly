import styled from "styled-components";
import { useState } from "react";
import { useBranchs } from "../../hooks/branch/useGetAllBranch";
import { useLoginContext } from "../../context/LoginContext";

const BranchContainer = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BranchTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const DropdownContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.lighter};
  text-align: right;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${({ theme }) => theme.transition};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
  }
`;

const DropdownArrow = styled.span`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

const SelectedBranch = styled.span`
  color: ${({ theme, placeholder }) =>
    placeholder ? theme.colors.muted : theme.colors.text};
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.base}
    ${({ theme }) => theme.borderRadius.base};
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-top: 2px;

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
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lighter};
  text-align: right;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.lighter};
  }

  &.selected {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const BranchDropdown = ({
  branchValue,
  setBranchValue,
  title = "منتجات فرع",
  placeholder = "اختر الفرع",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { cookies, userLogin } = useLoginContext();
  const { isLoading, branchs, error } = useBranchs(cookies, userLogin);

  const branches = branchs?.map((branch) => {
    return { name: branch.name, id: branch._id };
  });

  const selectedBranch = branches?.find(
    (branch) => branch.name === branchValue.name
  );

  const handleSelect = (i) => {
    setBranchValue(branches[i]);
    setIsOpen(false);
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <BranchContainer>
      <BranchTitle>{title}</BranchTitle>

      <DropdownContainer>
        <DropdownButton
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <SelectedBranch placeholder={!selectedBranch}>
            {selectedBranch ? selectedBranch.name : placeholder}
          </SelectedBranch>
          <DropdownArrow isOpen={isOpen}>▼</DropdownArrow>
        </DropdownButton>

        {isOpen && (
          <DropdownList role="listbox">
            {branches?.map((branch, i) => (
              <DropdownItem
                key={i}
                onClick={() => handleSelect(i)}
                className={branchValue.name === branch.name ? "selected" : ""}
                role="option"
                aria-selected={branchValue.name === branch.name}
              >
                {branch.name}
              </DropdownItem>
            ))}

            {branches?.length === 0 && (
              <DropdownItem style={{ justifyContent: "center", opacity: 0.7 }}>
                لا توجد فروع متاحة
              </DropdownItem>
            )}
          </DropdownList>
        )}
      </DropdownContainer>
    </BranchContainer>
  );
};

export default BranchDropdown;
