import styled from "styled-components";
import { useIncomesContext } from "../../context/IncomesContext";
import { formatDateTime } from "../../utils/formatDateTime";
import Spinner from "../../utils/Spinner";

const CollapsibleTable = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  height: ${({ open }) => (open ? "450px" : "auto")};
  transition: height 0.3s ease;

  @media (max-width: 768px) {
    height: ${({ open }) => (open ? "400px" : "auto")};
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  flex-shrink: 0;
`;

const TableTitle = styled.h3`
  margin: 0;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-height: 0;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  min-height: 0;

  /* تخصيص شكل الـ scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  /* إظهار الـ scrollbar عند التمرير أو الـ hover */
  &:hover::-webkit-scrollbar-thumb,
  &:focus-within::-webkit-scrollbar-thumb {
    opacity: 1;
  }

  /* للمتصفحات الأخرى */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &:hover {
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  @media (max-width: 768px) {
    min-width: 500px;
  }
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.lighter};
  position: sticky;
  top: 0;
  z-index: 10;

  /* إضافة ظل خفيف للهيدر */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lighter};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transition: background-color 0.2s ease;
  }
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  white-space: nowrap;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 200px;

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

// مكون مساعد لعرض محتوى الجدول
const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

function IncomesTables({ invoices, isLoading }) {
  const {
    setIsProductsTableOpen,
    isProductsTableOpen,
    // soldProducts,
    setIsInvoicesTableOpen,
    isInvoicesTableOpen,
  } = useIncomesContext();

  const productsSolded = invoices?.data?.data
    ?.map((inv) => inv.products)
    .flat();

  const soldProducts = productsSolded?.reduce((acc, product) => {
    const existingProduct = acc?.find(
      (prod) => product?.product?._id === prod?.product?._id
    );
    if (existingProduct) {
      existingProduct.quantity += product?.quantity;
      return acc;
    } else return [...acc, { ...product }];
  }, []);

  

  return (
    <>
      <CollapsibleTable open={isProductsTableOpen}>
        <TableHeader
          onClick={() => setIsProductsTableOpen(!isProductsTableOpen)}
        >
          <TableTitle>
            المنتجات المباعة (
            {isLoading ? <Spinner size="small" /> : soldProducts?.length || 0})
          </TableTitle>
          <ToggleButton>{isProductsTableOpen ? "▲" : "▼"}</ToggleButton>
        </TableHeader>

        {isProductsTableOpen && (
          <TableContainer>
            <TableContent>
              {soldProducts?.length > 0 ? (
                <ScrollContainer>
                  <Table>
                    <TableHead>
                      <tr>
                        <TableHeaderCell>المنتج</TableHeaderCell>
                        <TableHeaderCell>السعر</TableHeaderCell>
                        <TableHeaderCell>الخصم</TableHeaderCell>
                        <TableHeaderCell>الكمية المباعة</TableHeaderCell>
                        <TableHeaderCell>إجمالي القيمة</TableHeaderCell>
                      </tr>
                    </TableHead>
                    <tbody>
                      {soldProducts?.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>{product.product.name}</TableCell>
                          <TableCell>{product.product.price} ر.س</TableCell>
                          <TableCell>{product.product.discount} ر.س</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>
                            {(product.product.price -
                              product.product.discount) *
                              product.quantity}{" "}
                            ر.س
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </ScrollContainer>
              ) : (
                <EmptyState>
                  <p>لا توجد منتجات مباعة</p>
                </EmptyState>
              )}
            </TableContent>
          </TableContainer>
        )}
      </CollapsibleTable>

      <CollapsibleTable open={isInvoicesTableOpen}>
        <TableHeader
          onClick={() => setIsInvoicesTableOpen(!isInvoicesTableOpen)}
        >
          <TableTitle>
            الفواتير المسجلة (
            {isLoading ? (
              <Spinner size="small" />
            ) : (
              invoices?.data?.data?.length || 0
            )}
            )
          </TableTitle>
          <ToggleButton>{isInvoicesTableOpen ? "▲" : "▼"}</ToggleButton>
        </TableHeader>

        {isInvoicesTableOpen && (
          <TableContainer>
            <TableContent>
              {invoices?.data?.data?.length > 0 ? (
                <ScrollContainer>
                  <Table>
                    <TableHead>
                      <tr>
                        <TableHeaderCell>رقم الفاتورة</TableHeaderCell>
                        <TableHeaderCell>التاريخ</TableHeaderCell>
                        <TableHeaderCell>الوقت</TableHeaderCell>
                        <TableHeaderCell>الفرع</TableHeaderCell>
                        <TableHeaderCell>بواسطة</TableHeaderCell>
                        <TableHeaderCell>المنتجات</TableHeaderCell>
                        <TableHeaderCell>الخصم</TableHeaderCell>
                        <TableHeaderCell>الإجمالي</TableHeaderCell>
                      </tr>
                    </TableHead>
                    <tbody>
                      {invoices?.data?.data?.map((invoice) => (
                        <TableRow key={invoice._id}>
                          <TableCell>{invoice.code}</TableCell>
                          <TableCell>
                            {formatDateTime(invoice.createdAt).date}
                          </TableCell>
                          <TableCell>
                            {formatDateTime(invoice.createdAt).time}
                          </TableCell>
                          <TableCell>{invoice.branch.name}</TableCell>
                          <TableCell>{invoice.createdBy.name}</TableCell>
                          <TableCell>
                            {invoice?.products?.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}
                          </TableCell>
                          <TableCell>{invoice.totalDiscount} ر.س</TableCell>
                          <TableCell>{invoice.totalPrice} ر.س</TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </ScrollContainer>
              ) : (
                <EmptyState>
                  <p>لا توجد فواتير مسجلة</p>
                </EmptyState>
              )}
            </TableContent>
          </TableContainer>
        )}
      </CollapsibleTable>
    </>
  );
}

export default IncomesTables;
