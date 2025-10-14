// DateRangeFilter.jsx
import styled from "styled-components";
import { useIncomesContext } from "../../context/IncomesContext";
import { useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { useBranchs } from "../../hooks/branch/useGetAllBranch";
import { useAllInvoices } from "../../hooks/invoices/useGetAllInvoices";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../utils/Spinner";

const FilterContainer = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const FilterForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// توحيد ارتفاع وعرض جميع الحقول
const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.3s;
  height: 48px;
  box-sizing: border-box;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

// توحيد الـ styling مع الـ input
const DropdownButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
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
  height: 48px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
    transform: translateY(-1px);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
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
  height: 44px;
  display: flex;
  align-items: center;

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
`;

const DateRangeGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// زر البحث
const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

// مكون الـ Dropdown للفروع
const BranchDropdown = ({ value, onChange, branches }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogin } = useLoginContext();

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
      <DropdownButton type="button" onClick={handleToggle}>
        <span>
          {selectedBranch
            ? selectedBranch.name
            : ["owner", "admin"].includes(userLogin?.user?.role)
            ? "كل الفروع"
            : ""}
        </span>
        <DropdownArrow isOpen={isOpen}>▼</DropdownArrow>
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {["owner", "admin"].includes(userLogin?.user?.role) && (
            <DropdownItem
              onClick={() => handleSelect({ id: "all", name: "كل الفروع" })}
              className={value === "all" ? "selected" : ""}
            >
              كل الفروع
            </DropdownItem>
          )}
          {branches?.map((branch) => (
            <DropdownItem
              key={branch.id}
              onClick={() => handleSelect(branch)}
              className={value === branch.id ? "selected" : ""}
            >
              {branch.name}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

function DateRangeFilter({ isLoading }) {
  const {
    dateRange,
    setDateRange,
    branchFilter,
    setBranchFilter,
    searchText,
    setSearchText,
    applyFilters,
  } = useIncomesContext();

  const { cookies, userLogin } = useLoginContext();
  const {
    isLoading: isLoadingBranchs,
    branchs,
    error,
  } = useBranchs(cookies, userLogin);

  const queryClint = useQueryClient();

  const branches = branchs?.map((branch) => {
    return { id: branch?._id, name: branch?.name };
  });

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBranchChange = (branchId) => {
    setBranchFilter(branchId);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    queryClint.invalidateQueries({ queryKey: ["invoices"] });
  };

  return (
    <FilterContainer>
      <SectionTitle>فلتر الفواتير</SectionTitle>
      <FilterForm>
        <FilterGroup>
          <DateRangeGroup>
            <DateGroup>
              <Label htmlFor="startDate">من تاريخ</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange?.startDate}
                onChange={(e) => handleDateChange("startDate", e.target.value)}
              />
            </DateGroup>
            <DateGroup>
              <Label htmlFor="endDate">إلى تاريخ</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange?.endDate}
                onChange={(e) => handleDateChange("endDate", e.target.value)}
              />
            </DateGroup>
          </DateRangeGroup>
        </FilterGroup>

        <FilterGroup>
          <Label>البحث برقم التليفون أو الإيميل</Label>
          <Input
            type="text"
            placeholder="أدخل رقم التليفون أو الإيميل للبحث..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </FilterGroup>

        <FilterGroup>
          <Label>الفرع</Label>
          {isLoading ? (
            <Spinner size="large" />
          ) : (
            <BranchDropdown
              value={branchFilter}
              onChange={handleBranchChange}
              branches={branches}
              placeholder="اختر الفرع"
            />
          )}
        </FilterGroup>

        {/* زر البحث */}
        {/* <FilterGroup></FilterGroup> */}
        <FilterGroup>
          {/* <Label style={{ opacity: 0 }}>بحث</Label> */}
          <SearchButton onClick={handleSearch}>
            {isLoading ? <Spinner size="small" /> : "بحث"}
          </SearchButton>
        </FilterGroup>
      </FilterForm>
    </FilterContainer>
  );
}

export default DateRangeFilter;
