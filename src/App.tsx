import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import { AuthProvider, useAuth } from "../supabase/auth";
import { CartProvider } from "./components/cart/CartProvider";

// Lazy load components
const ProductsPage = lazy(() => import("./components/shop/ProductsPage"));
const ProductDetail = lazy(() => import("./components/shop/ProductDetail"));
const ContactPage = lazy(() => import("./components/pages/ContactPage"));
const CheckoutPage = lazy(() => import("./components/pages/CheckoutPage"));
const OrderTrackingPage = lazy(
  () => import("./components/pages/OrderTrackingPage"),
);

// Admin pages
const AdminPage = lazy(() => import("./components/pages/AdminPage"));
const AdminProductsPage = lazy(
  () => import("./components/pages/AdminProductsPage"),
);
const AdminOrdersPage = lazy(
  () => import("./components/pages/AdminOrdersPage"),
);
const AdminSettingsPage = lazy(
  () => import("./components/pages/AdminSettingsPage"),
);

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Signup route removed as we're using pre-created admin accounts */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route
          path="/shop"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductsPage />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetail />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CheckoutPage />
            </Suspense>
          }
        />
        <Route
          path="/order-tracking"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <OrderTrackingPage />
            </Suspense>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/admin/products"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute>
                <AdminProductsPage />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute>
                <AdminOrdersPage />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute>
                <AdminSettingsPage />
              </PrivateRoute>
            </Suspense>
          }
        />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <AppRoutes />
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
