import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';
import MentionsLegales from './pages/MentionsLegales/mentions-legales';
import SuccessPage from './pages/Success/success';
import CancelPage from './pages/Cancel/cancel';
import CGU from './pages/CGU/cgu';
import ProtectedRoute from './context/protected';
import { authenticate } from './services/apiServices';
import { PopupWidget } from 'react-calendly';


function App() {
  const calendlyLink = import.meta.env.VITE_CALENDLY_LINK
  useEffect(() => {
    authenticate();
  }, []); 
  return (
    <Router>
      <PopupWidget
          url={calendlyLink}
          rootElement={document.getElementById("root")}
          text="Prenez un rendez-vous!"
          textColor="#ffffff"
          color="#23a764"
        />
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
