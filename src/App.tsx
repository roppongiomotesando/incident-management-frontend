import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import IncidentsPage from './pages';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<IncidentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
