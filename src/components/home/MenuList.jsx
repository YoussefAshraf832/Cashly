import styled from "styled-components";
import { useHomeContext } from "../../context/HomeContext";
import { useState } from "react";
import { useExpensesContext } from "../../context/ExpensesContext";
import { useAllProductsInBranch } from "../../hooks/products/useGetAllProductsInBranch";
import { useLoginContext } from "../../context/LoginContext";
import { useEffect } from "react";
import { useBranchs } from "../../hooks/branch/useGetAllBranch";
import { PageSpinner } from "../../utils/Spinner";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const MainSection = styled.main`
  grid-area: main;
  padding: ${({ theme }) => theme?.spacing?.lg};
  overflow-y: auto;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    gap: ${({ theme }) => theme?.spacing?.md};
  }
`;

const CategorySection = styled.section`
  margin-bottom: ${({ theme }) => theme?.spacing?.lg};
`;

const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme?.colors?.primary};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
  border-bottom: 2px solid ${({ theme }) => theme?.colors?.secondary};
  padding-bottom: ${({ theme }) => theme?.spacing?.sm};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme?.spacing?.md};
  margin-bottom: ${({ theme }) => theme?.spacing?.lg};
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  padding: ${({ theme }) => theme?.spacing?.md};
  box-shadow: ${({ theme }) => theme?.shadows?.soft};
  cursor: pointer;
  transition: ${({ theme }) => theme?.transition};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme?.shadows?.medium};
  }
`;

const ProductCode = styled.p`
  font-size: ${({ theme }) => theme?.fontSizes?.sm};
  color: ${({ theme }) => theme?.colors?.muted};
  margin-bottom: ${({ theme }) => theme?.spacing?.xs};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme?.borderRadius?.sm};
  margin-bottom: ${({ theme }) => theme?.spacing?.sm};
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme?.fontSizes?.base};
  color: ${({ theme }) => theme?.colors?.text};
  margin-bottom: ${({ theme }) => theme?.spacing?.xs};
`;

const ProductPrice = styled.p`
  color: ${({ theme }) => theme?.colors?.primary};
  font-weight: bold;
`;

// Branch Dropdown Styles
const BranchSection = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme?.spacing?.lg};
  border-radius: ${({ theme }) => theme?.borderRadius?.lg};
  box-shadow: ${({ theme }) => theme?.shadows?.soft};
  margin-bottom: ${({ theme }) => theme?.spacing?.lg};
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme?.spacing.md};
  border: 2px solid
    ${({ theme, hasError }) =>
      hasError ? "#e74c3c" : theme?.colors?.secondary};
  border-radius: ${({ theme }) => theme?.borderRadius?.sm};
  font-size: ${({ theme }) => theme?.fontSizes?.base};
  background-color: white;
  text-align: right;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${({ theme }) => theme?.transition};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? "#e74c3c" : theme?.colors?.primary};
    box-shadow: ${({ theme, hasError }) =>
      hasError ? "0 0 0 3px rgba(231, 76, 60, 0.1)" : theme?.shadows?.accent};
    transform: translateY(-1px);
  }

  &:hover {
    border-color: ${({ theme }) => theme?.colors?.primary};
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
  border: 1px solid ${({ theme }) => theme?.colors?.secondary};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme?.borderRadius?.sm}
    ${({ theme }) => theme?.borderRadius?.sm};
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme?.colors?.lighter};
    border-radius: ${({ theme }) => theme?.borderRadius?.xs};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme?.colors?.secondary};
    border-radius: ${({ theme }) => theme?.borderRadius?.xs};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme?.colors?.accent};
  }
`;

const DropdownItem = styled.div`
  padding: ${({ theme }) => theme?.spacing.sm}
    ${({ theme }) => theme?.spacing?.md};
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.lighter};
  text-align: right;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.lighter};
  }

  &.selected {
    background-color: ${({ theme }) => theme?.colors?.primary};
    color: white;
  }
`;

const SearchSection = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme?.spacing?.lg};
  border-radius: ${({ theme }) => theme?.borderRadius?.lg};
  box-shadow: ${({ theme }) => theme?.shadows?.soft};
  margin-bottom: ${({ theme }) => theme?.spacing?.lg};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme?.colors?.primary};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
  padding-bottom: ${({ theme }) => theme?.spacing?.sm};
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.secondary};
`;

const SearchForm = styled.div`
  display: flex;
  gap: ${({ theme }) => theme?.spacing?.sm};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme?.spacing?.sm};
  border: 1px solid ${({ theme }) => theme?.colors?.secondary};
  border-radius: ${({ theme }) => theme?.borderRadius?.sm};
  font-size: ${({ theme }) => theme?.fontSizes?.base};
  flex-grow: 1;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme?.colors?.primary};
    box-shadow: ${({ theme }) => theme?.shadows?.accent};
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme?.spacing?.md};
  margin-bottom: ${({ theme }) => theme?.spacing?.lg};
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: ${({ theme }) => theme?.spacing?.sm}
    ${({ theme }) => theme?.spacing?.md};
  border: 1px solid ${({ theme }) => theme?.colors?.primary};
  border-radius: ${({ theme }) => theme?.borderRadius?.sm};
  background-color: ${(props) =>
    props.active ? ({ theme }) => theme?.colors?.primary : "transparent"};
  color: ${(props) =>
    props.active ? "white" : ({ theme }) => theme?.colors?.primary};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.primary};
    color: white;
  }
`;

// Branch Dropdown Component
const BranchDropdown = ({ value, onChange, branches, hasError }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedBranch = branches?.find((branch) => branch?.id === value);

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
        <span>{selectedBranch ? selectedBranch?.name : "اختر الفرع"}</span>
        <DropdownArrow isOpen={isOpen}>▼</DropdownArrow>
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {branches?.map((branch) => (
            <DropdownItem
              key={branch?.id}
              onClick={() => handleSelect(branch)}
              className={value === branch?.id ? "selected" : ""}
            >
              {branch.name}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

function MenuList() {
  const {
    activeCategory,
    addToInvoice,
    productFilter1,
    productFilter2,
    setProductFilter2,
    setProductFilter1,
    selectedBranch,
    setSelectedBranch,
  } = useHomeContext();
  const [item, setItem] = useState();
  const { filter, setFilter } = useExpensesContext("");
  const { id } = useParams();

  const { userLogin, cookies } = useLoginContext();
  const { isLoading, products, error } = useAllProductsInBranch(
    cookies,
    null,
    userLogin
  );
  const {
    isLoading: isLoadingBranchs,
    branchss,
    error: errBranchs,
  } = useBranchs(cookies, userLogin);

  if (errBranchs) toast.error(errBranchs?.message);
  if (error) toast.error(error?.message);

  const productsFiltered =
    productFilter1 === ""
      ? !item
        ? products?.data?.data
        : products?.data?.data?.filter(
            (product) =>
              product?.code?.includes(item) || product?.name?.includes(item)
          )
      : products?.data?.data?.filter(
          (product) => product?.filter1 === productFilter1
        );

  // useEffect(
  //   function () {
  //     if (id !== "all" && productsFiltered) {
  //       setProductFilter1(productsFiltered[id]?.filter1);
  //     } else setProductFilter1("");
  //   },
  //   [id, productsFiltered]
  // );

  if (isLoading || isLoadingBranchs)
    return <PageSpinner style={{ left: "40%" }} />;

  const categorie = productsFiltered?.reduce((cur, acc) => {
    if (cur?.includes(acc?.filter2)) {
      return cur;
    } else {
      return [...cur, acc?.filter2];
    }
  }, []);

  const productsFiltered2 =
    productFilter2 === ""
      ? productsFiltered
      : productsFiltered?.filter(
          (product) => product?.filter2 === productFilter2
        );

  // بيانات الفروع (يمكن جلبها من API أو context)
  // const branches = branchs?.map((branch) => {
  //   return { id: branch?._id, name: branch?.name };
  // });

  const branches = branchss?.map((branch) => {
    return { id: branch?._id, name: branch?.name };
  });
  //  [
  //   { id: "branch-1", name: "الفرع الرئيسي - القاهرة" },
  //   { id: "branch-2", name: "فرع الجيزة" },
  //   { id: "branch-3", name: "فرع الإسكندرية" },
  //   { id: "branch-4", name: "فرع المنصورة" },
  // ];

  return (
    <MainSection>
      {/* قسم اختيار الفرع */}
      {["owner", "admin"].includes(userLogin?.user?.role) && (
        <BranchSection>
          <SectionTitle>اختيار الفرع</SectionTitle>
          <BranchDropdown
            value={selectedBranch}
            onChange={setSelectedBranch}
            branches={branches}
            hasError={false}
          />
        </BranchSection>
      )}
      {activeCategory === "all" && (
        <SearchSection>
          <SectionTitle>البحث عن منتج</SectionTitle>
          <SearchForm>
            <Input
              type="text"
              placeholder="أدخل اسم المنتج أو الكود"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </SearchForm>
        </SearchSection>
      )}

      {(item || productFilter1 !== "") && (
        <CategorySection>
          <CategoryTitle>{productFilter1 || "نتائج البحث"}</CategoryTitle>
          {productFilter1 !== "" && (
            <FilterSection>
              <FilterButton
                onClick={() => {
                  setProductFilter2("");
                  setFilter("all");
                }}
                active={filter === "all"}
              >
                الكل
              </FilterButton>
              {categorie?.map((type, i) => (
                <FilterButton
                  key={i}
                  onClick={() => {
                    setProductFilter2(type);
                    setFilter(type);
                  }}
                  active={filter === type}
                >
                  {type}
                </FilterButton>
              ))}
            </FilterSection>
          )}

          <ProductsGrid>
            {productsFiltered2?.map((product, i) => (
              <ProductCard key={i} onClick={() => addToInvoice(product)}>
                <ProductName>{product.name}</ProductName>
                <ProductCode>كود: {product.code}</ProductCode>
                <ProductCode>
                  عدد:{" "}
                  {product?.quantityInBranch?.find((branch) => {
                    return branch.branch._id === selectedBranch;
                  })?.quantity || 0}
                </ProductCode>
                <ProductPrice>{product.price} ريال</ProductPrice>
              </ProductCard>
            ))}
          </ProductsGrid>
        </CategorySection>
      )}
    </MainSection>
  );
}

export default MenuList;
