import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages';
import IncidentsPage from './pages/incidents';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <nav className="bg-gray-800 p-4">
          <div className="max-w-3xl mx-auto flex gap-4">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/incidents" className="text-white hover:text-gray-300">Incidents</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/incidents" element={<IncidentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
