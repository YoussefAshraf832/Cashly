import { URL } from "../config";

export const createInvoice = async function ({
  cookies,
  branchId,
  products,
  paymentMethod,
}) {
  if (!branchId) throw new Error("Please choose a branch");
  const res = await fetch(`${URL}/invoices/branch/${branchId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      products,
      paymentMethod,
    }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error") {
    throw new Error(data.message);
  }

  return data;
};

export const getAllInvoices = async function ({
  cookies,
  branchId,
  startDate = "_",
  endDate = "_",
  emailOrPhone = "_",
}) {
  const res = await fetch(
    `${URL}/invoices?branch=${branchId}&from=${startDate || "_"}&to=${
      endDate || "_"
    }&user=${emailOrPhone || "_"}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
      // body: JSON.stringify({
      //   products,
      //   paymentMethod,
      // }),
    }
  );

  const data = await res.json();

  if (data.status === "fail" || data.status === "error") {
    throw new Error(data.message);
  }

  return data;
};
