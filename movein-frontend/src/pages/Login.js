import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
    // Clear errors when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Mock login - in a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ 
        id: '123', 
        name: 'Test User',
        email: credentials.email 
      }));
      
      // Redirect to homepage
      navigate('/');
      
    } catch (error) {
      setErrors({ 
        form: 'Login failed. Please check your credentials and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#F9FAFB' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '28rem', 
        margin: '0 auto', 
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 700, 
            color: '#111827',
            marginBottom: '1rem' 
          }}>
            Welcome back
          </h1>
          <p style={{ color: '#6B7280' }}>
            Sign in to your account to continue
          </p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          padding: '1.5rem' 
        }}>
          {errors.form && (
            <div style={{ 
              marginBottom: '1rem', 
              padding: '0.75rem', 
              backgroundColor: '#FEE2E2', 
              borderRadius: '0.375rem', 
              color: '#B91C1C' 
            }}>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem', 
                  fontWeight: 500, 
                  color: '#374151' 
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={credentials.email}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem 0.75rem', 
                  borderRadius: '0.375rem', 
                  border: errors.email ? '1px solid #F87171' : '1px solid #D1D5DB', 
                  fontSize: '1rem',
                  backgroundColor: '#F9FAFB',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#93C5FD'}
                onBlur={(e) => e.target.style.borderColor = errors.email ? '#F87171' : '#D1D5DB'}
              />
              {errors.email && (
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#EF4444' }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label 
                  htmlFor="password" 
                  style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: 500, 
                    color: '#374151' 
                  }}
                >
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  style={{ 
                    fontSize: '0.875rem', 
                    color: '#4F46E5',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem 0.75rem', 
                  borderRadius: '0.375rem', 
                  border: errors.password ? '1px solid #F87171' : '1px solid #D1D5DB', 
                  fontSize: '1rem',
                  backgroundColor: '#F9FAFB',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#93C5FD'}
                onBlur={(e) => e.target.style.borderColor = errors.password ? '#F87171' : '#D1D5DB'}
              />
              {errors.password && (
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#EF4444' }}>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{ 
                width: '100%', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0.625rem 1.25rem', 
                fontWeight: 500, 
                color: 'white', 
                backgroundColor: isLoading ? '#818CF8' : '#4F46E5', 
                borderRadius: '0.375rem', 
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                if (!isLoading) e.target.style.backgroundColor = '#4338CA';
              }}
              onMouseOut={(e) => {
                if (!isLoading) e.target.style.backgroundColor = '#4F46E5';
              }}
            >
              {isLoading ? (
                <span style={{ 
                  display: 'inline-block', 
                  width: '1rem', 
                  height: '1rem', 
                  borderRadius: '50%', 
                  border: '2px solid rgba(255, 255, 255, 0.3)', 
                  borderTopColor: 'white', 
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }} />
              ) : null}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <div style={{ 
          marginTop: '1.5rem', 
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#6B7280'
        }}>
          Don't have an account?{' '}
          <Link 
            to="/register" 
            style={{ 
              color: '#4F46E5', 
              fontWeight: 500,
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 