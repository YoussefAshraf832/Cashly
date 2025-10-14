import styled from "styled-components";
import { useAccountsContext } from "../../context/AccountsContext";
import { ButtonPrimary, ButtonSecondary } from "../../utils/Buttons";
import { formatDateTime } from "../../utils/formatDateTime";

const SearchSection = styled.div`
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

const SearchForm = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  flex-grow: 1;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
`;

const InvoiceDetails = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: ${(props) => (props.show ? "block" : "none")};

  @media (max-width: 768px) {
    overflow: hidden;
    overflow-x: scroll;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const DetailValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.lighter};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lighter};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

function AccountsSearch({ expensesInvoicesActive }) {
  const {
    searchTerm,
    setSearchTerm,
    searchInvoice,
    cancelSearch,
    searchResult,
  } = useAccountsContext();

  const { invoices } = expensesInvoicesActive?.data || {};

  return (
    <>
      <SearchSection>
        <SectionTitle>البحث عن فاتورة</SectionTitle>
        <SearchForm>
          <Input
            type="text"
            placeholder="أدخل كود الفاتورة"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ButtonPrimary onClick={() => searchInvoice(invoices)}>
            بحث
          </ButtonPrimary>
          <ButtonSecondary onClick={cancelSearch}>إلغاء</ButtonSecondary>
        </SearchForm>
      </SearchSection>

      <InvoiceDetails show={searchResult}>
        {searchResult && (
          <>
            <SectionTitle>تفاصيل الفاتورة {searchResult.code}</SectionTitle>
            <DetailRow>
              <DetailLabel>التاريخ والوقت:</DetailLabel>
              <DetailValue>
                {formatDateTime(searchResult.createdAt).date} -{" "}
                {formatDateTime(searchResult.createdAt).time}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>الفرع:</DetailLabel>
              <DetailValue>{searchResult.branch.name}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>بواسطة:</DetailLabel>
              <DetailValue>{searchResult.createdBy.name}</DetailValue>
            </DetailRow>
            <h4>المنتجات:</h4>
            <ItemsTable>
              <TableHead>
                <tr>
                  <TableHeaderCell>المنتج</TableHeaderCell>
                  <TableHeaderCell>السعر</TableHeaderCell>
                  <TableHeaderCell>الخصم</TableHeaderCell>
                  <TableHeaderCell>الكمية</TableHeaderCell>
                  <TableHeaderCell>المجموع</TableHeaderCell>
                </tr>
              </TableHead>
              <tbody>
                {searchResult?.products?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.product.price} ر.س</TableCell>
                    <TableCell>{item.product.discount} ر.س</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {(item.product.price - item.product.discount) *
                        item.quantity}{" "}
                      ر.س
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </ItemsTable>

            <DetailRow>
              <DetailLabel>الطريقة:</DetailLabel>
              <DetailValue>{searchResult.paymentMethod} ر.س</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>المجموع قبل الخصم:</DetailLabel>
              <DetailValue>
                {searchResult.totalPrice + searchResult.totalDiscount} ر.س
              </DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>الخصم:</DetailLabel>
              <DetailValue>{searchResult.totalDiscount} ر.س</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>الإجمالي:</DetailLabel>
              <DetailValue>{searchResult.totalPrice} ر.س</DetailValue>
            </DetailRow>
          </>
        )}
      </InvoiceDetails>
    </>
  );
}

export default AccountsSearch;
