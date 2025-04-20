// App.js
import { useState } from 'react';
import './App.css';

const AuthModal = ({ isOpen, onClose, initialIsSignUp }) => {
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Lógica de autenticación aquí
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️🗨️'}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️🗨️'}
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="submit-button">
            {isSignUp ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          {isSignUp ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <div className="auth-buttons">
            <button 
              className="sign-in"
              onClick={() => {
                setIsSignUpModal(false);
                setIsModalOpen(true);
              }}
            >
              Sign In
            </button>
            <button 
              className="sign-up"
              onClick={() => {
                setIsSignUpModal(true);
                setIsModalOpen(true);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-wrapper">
          <h2>Bienvenido a nuestra plataforma</h2>
          <p>Selecciona Sign In para acceder o Sign Up para registrarte</p>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <p>&copy; 2024 Mi Empresa. Todos los derechos reservados.</p>
          <p>
            Desarrollado por <a href="/" className="brand">Nuestra Marca</a>
          </p>
        </div>
      </footer>

      <AuthModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIsSignUp={isSignUpModal}
      />
    </div>
  );
};

export default App;