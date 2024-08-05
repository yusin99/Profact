import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;