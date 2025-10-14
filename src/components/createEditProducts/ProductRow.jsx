import React from "react";
import styled from "styled-components";
import { useProduct } from "../../hooks/products/useGetProduct";
import { useLoginContext } from "../../context/LoginContext";
import { useEffect } from "react";
import { useState } from "react";

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lighter};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transition: background-color ${({ theme }) => theme.transition};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  border-right: 1px solid ${({ theme }) => theme.colors.secondary};
  text-align: center;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: white;
  transition: all ${({ theme }) => theme.transition};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all ${({ theme }) => theme.transition};
  font-weight: 600;

  &:hover {
    background-color: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

function ProductRow({ product, onDelete, onUpdate }) {
  // const { cookies } = useLoginContext();
  // const [code, setCode] = useState("");
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [filter1, setFilter1] = useState("");
  // const [filter2, setFilter2] = useState("");
  // const { product: getProduct } = useProduct(cookies, code);

  // function handleProduct() {
  //   if (!getProduct?.data?.data) {
  //     // product.name = "";
  //     product.price = "";
  //     product.category = "";
  //     product.subCategory = "";
  //     return;
  //   }

  //   product.code = getProduct?.data?.data.code;
  //   product.id = getProduct?.data?.data.id;
  //   // product.name = getProduct?.data?.data.name;
  //   product.price = getProduct?.data?.data.price;
  //   product.category = getProduct?.data?.data.filter1;
  //   product.subCategory = getProduct?.data?.data.filter2;
  // }

  // handleProduct();

  // useEffect(
  //   function () {
  //     if (getProduct?.data?.data && !name && !price) {
  //       setName(getProduct?.data?.data.name);
  //       setPrice(getProduct?.data?.data.price);
  //       setFilter1(getProduct?.data?.data.filter1);
  //       setFilter2(getProduct?.data?.data.filter2);
  //       product.id = getProduct?.data?.data.id;
  //       product.name = getProduct?.data?.data.name;
  //       product.price = getProduct?.data?.data.price;
  //       product.category = getProduct?.data?.data.filter1;
  //       product.subCategory = getProduct?.data?.data.filter2;
  //     } else if (!getProduct?.data?.data) {
  //       setName("");
  //       setPrice("");
  //       setFilter1("");
  //       setFilter2("");
  //     }

  //   },
  //   [getProduct?.data?.data, product]
  // );

  const handleInputChange = (field, value) => {
    onUpdate(product.id, field, value);
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          type="text"
          value={product.code}
          onChange={(e) => {
            // setCode(() => e.target.value);
            handleInputChange("code", e.target.value);
          }}
          placeholder="كود المنتج"
        />
      </TableCell>
      <TableCell>
        <Input
          type="text"
          value={product?.name}
          onChange={(e) => {
            // setName(e.target.value);
            handleInputChange("name", e.target.value);
          }}
          placeholder="اسم المنتج"
        />
      </TableCell>
      <TableCell>
        <Input
          type="text"
          value={product.category}
          onChange={(e) => {
            // setFilter1(e.target.value);
            handleInputChange("category", e.target.value);
          }}
          placeholder="الفئة"
        />
      </TableCell>
      <TableCell>
        <Input
          type="text"
          value={product.subCategory}
          onChange={(e) => {
            // setFilter2(e.target.value);
            handleInputChange("subCategory", e.target.value);
          }}
          placeholder="الفئة الفرعية"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={product.price}
          onChange={(e) => {
            // setPrice(e.target.value);
            handleInputChange("price", e.target.value);
          }}
          placeholder="السعر"
          min="0"
          step="0.01"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={product.discount}
          onChange={(e) => {
            // setPrice(e.target.value);
            handleInputChange("discount", e.target.value);
          }}
          placeholder="الخصم"
          min="0"
          step="0.01"
        />
      </TableCell>
      <TableCell>
        <DeleteButton onClick={() => onDelete(product.id)}>حذف</DeleteButton>
      </TableCell>
    </TableRow>
  );
}

export default ProductRow;
