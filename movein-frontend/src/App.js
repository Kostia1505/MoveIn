import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Page imports
import Home from './pages/Home';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Sell from './pages/Sell';
import Properties from './pages/Properties';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateAd from './pages/CreateAd';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout hideNavbar={true}><Home /></Layout>} />
        <Route path="/buy" element={<Layout hideNavbar={true}><Buy /></Layout>} />
        <Route path="/rent" element={<Layout hideNavbar={true}><Rent /></Layout>} />
        <Route path="/sell" element={<Layout hideNavbar={true}><Sell /></Layout>} />
        <Route path="/properties" element={<Layout hideNavbar={true}><Properties /></Layout>} />
        <Route path="/property/:id" element={<Layout hideNavbar={true}><PropertyDetail /></Layout>} />
        <Route path="/login" element={<Layout hideNavbar={true}><Login /></Layout>} />
        <Route path="/signup" element={<Layout hideNavbar={true}><Signup /></Layout>} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Layout hideNavbar={true}>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/create-ad" 
          element={
            <PrivateRoute>
              <Layout hideNavbar={true}>
                <CreateAd />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Layout hideNavbar={true}><NotFound /></Layout>} />
      </Routes>
    </>
  );
}

export default App;
