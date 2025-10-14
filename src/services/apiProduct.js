import { URL } from "../config";

export const createUpdateProductsInfo = async function ({ products, cookies }) {
  const res = await fetch(`${URL}/products`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      products,
    }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};

export const getProduct = async function (cookies, code) {
  const res = await fetch(`${URL}/products/${code}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    // body: JSON.stringify({
    //   products,
    // }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};

export const updateProductInBranch = async function ({
  cookies,
  products,
  userLogin,
}) {
  const res = await fetch(
    `${URL}/products${
      ["admin", "owner", "manager-products"].includes(userLogin?.user?.role)
        ? ""
        : `/branch/${userLogin?.user?.branch?._id}`
    }`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        products,
      }),
    }
  );

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};

export const allProductInBranch = async function (cookies, branchId) {
  const res = await fetch(`${URL}/products/branch/${branchId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    // body: JSON.stringify({
    //   products,
    // }),
  });
  // : await fetch(`${URL}/products`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: `Bearer ${cookies.jwt}`,
  //     },
  //     // body: JSON.stringify({
  //     //   products,
  //     // }),
  //   });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};

export const allProducts = async function (cookies) {
  const res = await fetch(`${URL}/products`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    // body: JSON.stringify({
    //   products,
    // }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};
