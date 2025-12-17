import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import UserList from './pages/admin/UserList';
import AddUser from './pages/admin/AddUser';
import EditUser from './pages/admin/EditUser';

// Component to conditionally show navbar
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public routes - redirect to catalog if already authenticated */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        
        {/* Public pages - no authentication required */}
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* Protected routes - require authentication */}
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/catalog" replace />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/add" element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/edit/:id" element={
          <ProtectedRoute adminOnly>
            <EditProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute adminOnly>
            <UserList />
          </ProtectedRoute>
        } />
        <Route path="/admin/users/add" element={
          <ProtectedRoute adminOnly>
            <AddUser />
          </ProtectedRoute>
        } />
        <Route path="/admin/users/edit/:id" element={
          <ProtectedRoute adminOnly>
            <EditUser />
          </ProtectedRoute>
        } />
        
        {/* Default redirect - go to catalog */}
        <Route path="*" element={<Navigate to="/catalog" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;

