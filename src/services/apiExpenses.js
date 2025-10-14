import { URL } from "../config";

export const createExpense = async function ({ cookies, bodyObj }) {
  const res = await fetch(`${URL}/expenses`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      ...bodyObj,
    }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error") {
    throw new Error(data.message);
  }

  return data;
};

export const getAllExpenses = async function (cookies) {
  const res = await fetch(`${URL}/expenses`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    // body: JSON.stringify({
    //   products,
    //   paymentMethod,
    // }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error") {
    throw new Error(data.message);
  }

  return data;
};

export const getAllExpensesInvoiceActive = async function (
  cookies,
  emailOrPhone
) {
  // if (!searching) return null;

  const res = await fetch(`${URL}/expenses/invoices/accounts/${emailOrPhone}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    // body: JSON.stringify({
    //   products,
    //   paymentMethod,
    // }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error") {
    throw new Error(data.message);
  }

  return data;
};

export const patchAllExpensesInvoiceActive = async function ({
  cookies,
  emailOrPhone,
  bodyObj,
}) {
  // if (!searching) return null;

  const res = await fetch(`${URL}/expenses/invoices/accounts/${emailOrPhone}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      ...bodyObj,
    }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error") {
    throw new Error(data.message);
  }

  return data;
};

export const deleteExpense = async function ({ cookies, id }) {
  // if (!searching) return null;

  const res = await fetch(`${URL}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    // body: JSON.stringify({
    //   ...bodyObj,
    // }),
  });

  let data = {};
  if (res.status !== 204) data = await res.json();

  if (data.status === "fail" || data.status === "error") {
    throw new Error(data.message);
  }
};
