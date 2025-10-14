import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, theme } from "../src/GlobalStyle.js";
import Login from "./pages/Login.jsx";
import AppLayout from "./components/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import { HomeContextProvider } from "./context/HomeContext.jsx";
import ExpressPage from "./pages/ExpressPage.jsx";
import { ExpensesContextProvider } from "./context/ExpensesContext.jsx";
import IncomesPage from "./pages/IncomesPage.jsx";
import { IncomesContextProvider } from "./context/IncomesContext.jsx";
import AccountsPage from "./pages/AccountsPage.jsx";
import { AccountsContextProvider } from "./context/AccountsContext.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProductsPage from "./pages/productsPage.jsx";
import ProductsManagementPage from "./pages/ProductsManagementPage.jsx";
import ProductsDetailsPage from "./pages/ProductsDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import OwnerSignup from "./pages/OwnerSignup.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5,
    },
  },
});

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <HomeContextProvider>
          <ExpensesContextProvider>
            <IncomesContextProvider>
              <AccountsContextProvider>
                <LoginProvider>
                  <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                      <GlobalStyle />
                      <Routes>
                        <Route path="/" element={<AppLayout />}>
                          <Route
                            index
                            element={<Navigate replace to="/login" />}
                          />
                          <Route
                            path="home"
                            element={<Navigate replace to="/home/all" />}
                          />
                          <Route path="home/:id" element={<Home />} />
                          <Route path="expenses" element={<ExpressPage />} />
                          <Route path="incomes" element={<IncomesPage />} />
                          <Route path="accounts" element={<AccountsPage />} />
                          <Route path="settings" element={<SettingsPage />} />
                          <Route path="products" element={<ProductsPage />} />
                          <Route
                            path="owner-signup"
                            element={<OwnerSignup />}
                          />
                          <Route
                            path="products_management"
                            element={<ProductsManagementPage />}
                          />
                          <Route
                            path="products_details"
                            element={<ProductsDetailsPage />}
                          />
                          <Route path="login" element={<Login />} />
                          {/* <Route path="me" element={<Account />} /> */}
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </ThemeProvider>
                    <Toaster
                      position="top-center"
                      gutter={12}
                      containerStyle={{
                        margin: theme.spacing.sm,
                        zIndex: 99999,
                      }}
                      toastOptions={{
                        success: {
                          duration: 3000,
                          style: {
                            background: theme.colors.lighter,
                            color: theme.colors.text,
                            border: "1px solid #55c57a",
                            borderLeft: "4px solid #55c57a",
                            boxShadow: theme.shadows.medium,
                          },
                          iconTheme: {
                            primary: "#55c57a",
                            secondary: theme.colors.lighter,
                          },
                        },
                        error: {
                          duration: 5000,
                          style: {
                            background: theme.colors.lighter,
                            color: theme.colors.text,
                            border: "1px solid #dc3545",
                            borderLeft: "4px solid #dc3545",
                            boxShadow: theme.shadows.medium,
                          },
                          iconTheme: {
                            primary: "#dc3545",
                            secondary: theme.colors.lighter,
                          },
                        },
                        loading: {
                          duration: 4000,
                          style: {
                            background: theme.colors.lighter,
                            color: theme.colors.text,
                            border: `1px solid ${theme.colors.primary}`,
                            borderLeft: `4px solid ${theme.colors.primary}`,
                            boxShadow: theme.shadows.medium,
                          },
                          iconTheme: {
                            primary: theme.colors.primary,
                            secondary: theme.colors.lighter,
                          },
                        },
                        style: {
                          fontSize: theme.fontSizes.base,
                          maxWidth: "500px",
                          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                          backgroundColor: theme.colors.lighter,
                          color: theme.colors.text,
                          borderRadius: theme.borderRadius.sm,
                          border: `1px solid ${theme.colors.secondary}`,
                          boxShadow: theme.shadows.medium,
                          fontFamily: "'Segoe UI', 'Roboto', sans-serif",
                          fontWeight: "500",
                          textAlign: "right",
                          direction: "rtl",
                        },
                      }}
                    />
                  </QueryClientProvider>
                </LoginProvider>
              </AccountsContextProvider>
            </IncomesContextProvider>
          </ExpensesContextProvider>
        </HomeContextProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
