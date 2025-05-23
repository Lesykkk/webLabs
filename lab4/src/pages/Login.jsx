import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/tickets');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="background-container">
      <header id="header" className="header">
        <div id="header-container" className="header-container">
          <nav className="navigation-desktop">
            <div className="navigation-links-desktop">
              <Link className="navigation-link-desktop" to="/">Events</Link>
              <Link className="navigation-link-desktop" to="/about">About</Link>
              <Link className="navigation-link-desktop" to="/tickets">My tickets</Link>
              {user && (
                <a 
                    href="#logout" 
                    className="navigation-link-desktop logout-link"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                    >
                    Logout
                </a>
              )}
            </div>
          </nav>
          <nav className="navigation-mobile">
            <img src="media/icons/menu-icon2.svg" alt="" className="navigation-button-menu" id="menuButton"/>
            <img src="media/icons/cancel-icon1.svg" alt="" className="navigation-button-cancel" id="cancelButton"/>
            <div className="navigation-links-mobile" id="navigationLinksMobile">
              <Link className="navigation-link-mobile" to="/">Events</Link>
              <Link className="navigation-link-mobile" to="/about">About</Link>
              <Link className="navigation-link-mobile" to="/tickets">My tickets</Link>
              {user && (
                <a 
                    href="#logout" 
                    className="navigation-link-desktop logout-link"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                    >
                    Logout
                </a>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          {error && <div style={{color: '#ff3860', marginTop: '20px'}}>{error}</div>}

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            placeholder="Email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            placeholder="Password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className='auth-button' type="submit">Login</button>
          
          <div className="social">
            <div>
              <Link to="/signup" style={{textDecoration: 'none', color: '#eaf0fb'}}>
                Don't have account? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}