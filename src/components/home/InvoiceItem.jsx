import { useEffect, useState } from "react";
import styled from "styled-components";
import { useHomeContext } from "../../context/HomeContext";

const StyledInvoiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 80px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

function InvoiceItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { updateQuantity, removeFromInvoice, selectedBranch } =
    useHomeContext();

  // const count = item.quantityInBranch?.find(
  //   (branch) => branch.branch._id === selectedBranch
  // )?.quantity;

  useEffect(
    function () {
      setQuantity(() => Number(item.quantity));
    },
    [item.quantity]
  );

  if (+quantity < 0) setQuantity(0);

  return (
    <StyledInvoiceItem>
      <div>
        <div>{item.name}</div>
        <div
          style={{
            fontSize: "0.8rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            onClick={() => {
              updateQuantity(item.id, quantity - 1);
              setQuantity((x) => Number(x) - 1);
            }}
          >
            -
          </button>
          <Input
            type="number"
            value={quantity ? quantity : ""}
            onChange={(e) => {
              setQuantity(+e.target.value);

              updateQuantity(
                item.id,
                e.target.value === "" ? 0 : +e.target.value
              );
            }}
          />

          <button
            onClick={() => {
              updateQuantity(item.id, quantity + 1);
              setQuantity((x) => Number(x) + 1);
            }}
          >
            +
          </button>
          <button
            onClick={() => removeFromInvoice(item.id)}
            style={{ color: "red", marginLeft: "8px" }}
          >
            حذف
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {Math.round(item.discount * quantity * 100) / 100}{" "}
        <span style={{ display: "block", margin: "auto" }}>خصم</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {Math.round((item.price - item.discount) * quantity * 100) / 100}{" "}
        <span style={{ display: "block", margin: "auto" }}>ريال</span>
      </div>
    </StyledInvoiceItem>
  );
}

export default InvoiceItem;
