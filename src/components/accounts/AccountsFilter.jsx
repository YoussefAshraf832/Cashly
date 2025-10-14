import styled from "styled-components";
import { useAccountsContext } from "../../context/AccountsContext";
import { useState } from "react";

const FilterSection = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SearchTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const InputContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.lighter};
  transition: all ${({ theme }) => theme.transition};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0;
    cursor: default;
  }
`;

function AccountsFilter() {
  const { setSearchFilter } = useAccountsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    if (value.trim()) {
      setSearchFilter(value.trim());
    } else {
      setSearchFilter(null);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchFilter(null);
  };

  return (
    <FilterSection>
      <SearchTitle>البحث في الحسابات</SearchTitle>

      <InputContainer>
        <SearchInput
          type="text"
          placeholder="ابحث بالبريد الإلكتروني أو رقم التليفون..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {/* <SearchIcon>🔍</SearchIcon> */}

        <ClearButton
          onClick={handleClear}
          disabled={!searchTerm.trim()}
          title="مسح البحث"
        >
          ✕
        </ClearButton>
      </InputContainer>
    </FilterSection>
  );
}

export default AccountsFilter;
