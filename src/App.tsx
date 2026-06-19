import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import CategoryDetail from '@/pages/CategoryDetail';
import Practice from '@/pages/Practice';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryDetail />} />
        <Route path="/practice/:materialId" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;