import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Footer from './components/layout/Footer';

// Admin Imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Inquiries from './pages/admin/Inquiries';
import Applications from './pages/admin/Applications';
import ContentManager from './pages/admin/ContentManager';



const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen">
      {/* Background Decor */}
      {!isAdminPath && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-theme-primary/10 blur-[100px]" />
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] rounded-full bg-theme-secondary/10 blur-[120px]" />
        </div>
      )}

      <div className={`${isAdminPath ? '' : 'container mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-4 max-w-7xl'} relative z-10`}>
        {!isAdminPath && <Navbar />}
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="applications" element={<Applications />} />
            <Route path="content/:type" element={<ContentManager />} />
          </Route>


        </Routes>
      </div>

      {!isAdminPath && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12 md:mt-20">
          <Footer />
        </div>
      )}
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;


