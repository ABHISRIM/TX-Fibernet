import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlanDetailsModal from './components/PlanDetailsModal';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Plans from './pages/Plans';
import Coverage from './pages/Coverage';
import WhyUs from './pages/WhyUs';
import FaqPage from './pages/FaqPage';
import Contact from './pages/Contact';
import Corporate from './pages/Corporate';
import NotFound from './pages/NotFound';

import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

function App() {
  const [selectedPlanForModal, setSelectedPlanForModal] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlanForModal(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlanForModal(null);
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Public Information & Exploration Routes */}
          <Route path="/" element={<Home onSelectPlan={handleSelectPlan} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/plans" element={<Plans onSelectPlan={handleSelectPlan} />} />
          <Route path="/coverage" element={<Coverage onSelectPlan={handleSelectPlan} />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/corporate" element={<Corporate />} />

          {/* Protected Internal Admin Control Panel (Hidden from public navigation) */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/*" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Plan Information Modal */}
      {selectedPlanForModal && (
        <PlanDetailsModal plan={selectedPlanForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
