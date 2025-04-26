import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ 
        flexGrow: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '3rem 0' 
      }}>
        <div style={{ 
          textAlign: 'center', 
          maxWidth: '32rem', 
          margin: '0 auto', 
          padding: '0 1rem' 
        }}>
          <h1 style={{ 
            fontSize: '9rem', 
            fontWeight: 'bold', 
            color: '#EEF2FF', 
            lineHeight: 1 
          }}>404</h1>
          <h2 style={{ 
            fontSize: '1.875rem',  
            fontWeight: 'bold', 
            marginBottom: '1rem', 
            color: '#1F2937' 
          }}>Page Not Found</h2>
          <p style={{ 
            color: '#4B5563', 
            marginBottom: '2rem' 
          }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 