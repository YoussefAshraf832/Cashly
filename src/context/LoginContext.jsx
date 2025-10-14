import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { URL } from "../config";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocalStorageState } from '../hooks/useLocalStorageState';
// import { isLogin } from "../api/user";

const LoginContext = createContext();
function LoginProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [userLogin, setUserLogin] = useState();
  const [isloginLoad, setLoginLoad] = useState(cookies.jwt ? true : false);
  const navigate = useNavigate();

  const allRoles = {
    owner: [
      { value: "user", label: "موظف" },
      { value: "user-received", label: "موظف و مستلم" },
      { value: "received", label: "مستلم" },
      { value: "manager-products", label: "مدير المنتجات" },
      { value: "manager", label: "مدير" },
      { value: "accountant", label: "محاسب" },
      { value: "admin", label: "مدير عام" },
      { value: "supervisor", label: "مشرف" },
    ],

    admin: [
      { value: "user", label: "موظف" },
      { value: "user-received", label: "موظف و مستلم" },
      { value: "manager-products", label: "مدير المنتجات" },
      { value: "supervisor", label: "مشرف" },
      { value: "manager", label: "مدير" },
      { value: "accountant", label: "محاسب" },
    ],

    manager: [
      { value: "user", label: "موظف" },
      { value: "user-received", label: "موظف و مستلم" },
      { value: "supervisor", label: "مشرف" },
    ],
  };

  useEffect(() => {
    if (cookies && cookies.jwt && cookies.jwt != "undefined") {
      async function isLogin() {
        setLoginLoad(true);
        const res = await fetch(`${URL}/users/login`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            // Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            email: "",
            password: "",
            jwtToken: cookies.jwt,
          }),
        });
        const data = await res.json();

        // setCookie('jwt', data.token, {
        //   path: '/',
        //   secure: true,
        //   sameSite: 'None',
        // });

        setUserLogin(data.data);
        setLoginLoad(false);
      }

      isLogin();
    } else {
      setUserLogin(false);
      navigate("/login");
    }
  }, [cookies.jwt, cookies]);

  // const [login, setLogin] = useLocalStorageState(false, 'login');

  // const checkLogin = useCallback(
  // async function checkLogin() {
  // setLogin(() => false);
  // if (cookies?.jwt) {
  //   const logined = await isLogin(cookies?.jwt);
  //   setLogin(() => logined);
  // }
  // },
  // [cookies, setLogin],
  // );

  return (
    <LoginContext.Provider
      // value={{ cookies, setCookie, login, setLogin, checkLogin, removeCookie }}
      value={{
        cookies,
        setCookie,
        removeCookie,
        userLogin,
        setUserLogin,
        isloginLoad,
        allRoles,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) throw new Error("this component outside provider");
  return context;
}

export { LoginProvider, useLoginContext };
