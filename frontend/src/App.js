import './App.css';
import HomePage from './pages/Common/Home';
import Login from './pages/Admin/Login';
import Signup from './pages/Admin/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                  <HomePage />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
