import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';
import LandingPage from './pages/LandingPage';
import CookerSelectPage from './pages/CookerSelectPage';
import CheesecakeBuilderPage from './pages/CheesecakeBuilderPage';
import OrderMonitorPage from './pages/OrderMonitorPage';
import ShippingFormPage from './pages/ShippingFormPage';
import AdminDashboard from './pages/AdminDashboard';
import { connectSocket } from './services/socket';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuthStore();
  
  if (loading) return <div className="h-screen w-full flex items-center justify-center text-white">Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/" />;
  if (allowedRoles && !allowedRoles.includes(user?.rol)) return <Navigate to="/" />;
  
  return children;
};

export default function App() {
  const { fetchProfile } = useAuthStore();

  useEffect(() => {
    fetchProfile();
    connectSocket();
  }, [fetchProfile]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Protected Routes for Clients */}
        <Route path="/select-cooker" element={
          <ProtectedRoute>
            <CookerSelectPage />
          </ProtectedRoute>
        } />
        
        <Route path="/build-cheesecake" element={
          <ProtectedRoute>
            <CheesecakeBuilderPage />
          </ProtectedRoute>
        } />
        
        <Route path="/monitor/:orderId" element={
          <ProtectedRoute>
            <OrderMonitorPage />
          </ProtectedRoute>
        } />
        
        <Route path="/shipping/:orderId" element={
          <ProtectedRoute>
            <ShippingFormPage />
          </ProtectedRoute>
        } />
        
        {/* Protected Routes for Admin/Cooker */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin', 'cocinero', 'repartidor']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
