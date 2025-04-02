import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Page imports
import Home from './pages/Home';
import Listings from './pages/Listings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Listings />} />
        <Route path="/rent" element={<Listings />} />
        <Route path="/properties" element={<Listings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
