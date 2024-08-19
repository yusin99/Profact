import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';
import MentionsLegales from './pages/MentionsLegales/mentions-legales';
import SuccessPage from './pages/Success/success';
import CancelPage from './pages/Cancel/cancel';
import CGU from './pages/CGU/cgu';
import ProtectedRoute from './context/protected';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/success" element={<ProtectedRoute element={<SuccessPage />} />} />
        <Route path="/cancel" element={<ProtectedRoute element={<CancelPage />} />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgu" element={<CGU />} />
      </Routes>
    </Router>
  );
}

export default App;
