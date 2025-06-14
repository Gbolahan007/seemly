import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import UpdatePassword from "./authentication/UpdatePassword";
import { AppProvider } from "./contexts/AuthContext";

import { ModalProvider } from "./contexts/ModalProvider";
import PageNotFound from "./PageNotFound";
import About from "./pages/About";
import AuthCallback from "./pages/AuthCallback";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SignInSignUp from "./pages/sign up/SignInSignUp";
import ProductDisplay from "./ProductDisplay";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./ScrollTop";
import SuccessPage from "./pages/checkout/SuccessPage";
import CancelCheckout from "./pages/checkout/CancelCheckout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppProvider>
        <ModalProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/product/:category/:slug"
                  element={<ProductDisplay />}
                />

                {/* ✅ Protected routes */}
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/success"
                  element={
                    <ProtectedRoute>
                      <SuccessPage />
                    </ProtectedRoute>
                  }
                />

                <Route path="/cancel" element={<CancelCheckout />} />
              </Route>

              <Route path="/signup" element={<SignInSignUp />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </AppProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: "#4CAF50",
              color: "#FFFFFF",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#D32F2F",
              color: "#FFFFFF",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            background: "#222222",
            color: "#E0E0E0",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
