import { URL } from "../config";

export const login = async function ({ emailOrPhone, password }) {
  console.log(emailOrPhone, password, URL);
  const res = await fetch(`${URL}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      email: emailOrPhone,
      password,
    }),
  });

  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};

export const createOwner = async function ({
  name,
  phoneNumber,
  email,
  password,
  passwordConfirm,
}) {
  const res = await fetch(`${URL}/users/owner-signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      email,
      password,
      name,
      phoneNumber,
      passwordConfirm,
    }),
  });

  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};

export const signup = async function ({
  obj: { name, phoneNumber, email, password, passwordConfirm, branch, role },
  cookies,
}) {
  const res = await fetch(`${URL}/users/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      email,
      password,
      name,
      phoneNumber,
      passwordConfirm,
      branch: branch === "all" ? null : branch,
      role,
    }),
  });

  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};

export const updateMyPassword = async function ({
  obj: { currentPassword, password, passwordConfirm },
  cookies,
}) {
  const res = await fetch(`${URL}/users/updateMyPassword`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      currentPassword,
      password,
      passwordConfirm,
    }),
  });

  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
};
