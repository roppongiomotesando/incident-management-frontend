import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './pages';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Home />
      </div>
    </Router>
  );
}

export default App;
