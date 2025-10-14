import { URL } from "../config";

export async function allUsers(cookies, userLogin) {
  const res = await fetch(
    `${URL}/users${
      ["manager", "supervisor"].includes(userLogin.user.role)
        ? `/branch/${userLogin.user.branch._id}`
        : ""
    }`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
    }
  );
  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
}

export async function updateUser({ cookies, userLogin, bodyObj }) {
  if (!["manager", "admin", "owner"].includes(userLogin?.user.role)) return;

  const { updateUserId, roleUpdate, branchUpdateId } = bodyObj;

  const res = await fetch(
    `${URL}/users${
      userLogin?.user.role === "manager"
        ? `/branch/${userLogin?.user.branch._id}/${updateUserId}`
        : `/${updateUserId}`
    }`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        role: roleUpdate,
        branch: branchUpdateId,
      }),
    }
  );

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
}

export async function updateUserActive({ cookies, userLogin, bodyObj }) {
  if (!["manager", "admin", "owner"].includes(userLogin?.user.role)) return;

  const { userId, branchId } = bodyObj;

  const res = await fetch(`${URL}/users/active`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      userId,
      branchId,
    }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
}

export async function updatePasswordForUser({ cookies, userLogin, bodyObj }) {
  if (!["manager", "admin", "owner"].includes(userLogin?.user.role)) return;

  const { userId, password, passwordConfirm } = bodyObj;

  const res = await fetch(`${URL}/users/resetPasswordForUser`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: JSON.stringify({
      userId,
      password,
      passwordConfirm,
    }),
  });

  const data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);

  return data;
}

export async function deleteUser({ cookies, userLogin, userId }) {
  if (!["owner", "admin"].includes(userLogin?.user.role)) return;

  const res = await fetch(`${URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  let data = {};

  if (res.status !== 204) data = await res.json();

  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);
}
