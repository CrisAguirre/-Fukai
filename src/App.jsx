import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import LandingPage from './pages/LandingPage';
import CookerSelectPage from './pages/CookerSelectPage';
import CheesecakeBuilderPage from './pages/CheesecakeBuilderPage';
import OrderMonitorPage from './pages/OrderMonitorPage';
import ShippingFormPage from './pages/ShippingFormPage';
import AdminDashboard from './pages/AdminDashboard';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-cooker" element={<CookerSelectPage />} />
          <Route path="/build-cheesecake" element={<CheesecakeBuilderPage />} />
          <Route path="/monitor/:orderId" element={<OrderMonitorPage />} />
          <Route path="/shipping/:orderId" element={<ShippingFormPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}