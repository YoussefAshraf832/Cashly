import { URL } from "../config";

export const createNewBranch = async function ({
  name,
  address,
  code,
  phoneNumber,
  cookies,
}) {
  const res = await fetch(`${URL}/branchs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      name,
      address,
      code,
      phoneNumber: +phoneNumber,
    }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};

export const getAllBranch = async function (cookies, userLogin) {
  if (!["admin", "owner", "manager"].includes(userLogin.user.role)) return "";

  const res =
    userLogin?.user.role === "manager"
      ? await fetch(`${URL}/branchs/${userLogin?.user.branch._id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
          // body: JSON.stringify({
          //   name,
          //   address,
          //   code,
          //   phoneNumber: +phoneNumber,
          // }),
        })
      : await fetch(`${URL}/branchs`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
          // body: JSON.stringify({
          //   name,
          //   address,
          //   code,
          //   phoneNumber: +phoneNumber,
          // }),
        });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  if (userLogin?.user.role === "manager") return [data.data.data];

  return data.data.data;
};

export const updateBranch = async function ({ cookies, branchId, bodyObj }) {
  const { name, address, code, phoneNumber } = bodyObj;

  const res = await fetch(`${URL}/branchs/${branchId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      name,
      address,
      code,
      phoneNumber: +phoneNumber,
    }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data.data;
};

export const deleteBranch = async function ({ branchId, cookies }) {
  const res = await fetch(`${URL}/branchs/${branchId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    // body: JSON.stringify({
    //   name,
    //   address,
    //   code,
    //   phoneNumber: +phoneNumber,
    // }),
  });
  let data = {};
  if (res.status !== 204) data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);
};
