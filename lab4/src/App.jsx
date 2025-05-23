import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './pages/PrivateRoute';
import Home from './pages/Home';
import About from './pages/About';
import Tickets from './pages/Tickets';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { uploadEventsToFirestore } from "./utils/uploadEvents";


export default function App() {
  // useEffect(() => {
  //   uploadEventsToFirestore();
  // }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tickets" element={
            <PrivateRoute>
              <Tickets />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}