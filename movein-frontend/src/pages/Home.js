import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?city=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        {/* Dark overlay */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}>
              Find Your Dream Home
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '2.5rem',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
            }}>
              Discover the perfect place to live with our extensive collection of properties
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ 
              display: 'flex', 
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <input 
                type="text" 
                placeholder="Enter location..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  flex: 1,
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '0.375rem 0 0 0.375rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ 
                  borderRadius: '0 0.375rem 0.375rem 0',
                  padding: '0.75rem 1.5rem'
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section style={{ 
        padding: '5rem 0', 
        backgroundColor: 'white',
        textAlign: 'center' 
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 'bold', 
            marginBottom: '4rem',
            color: '#111827'
          }}>
            Why Choose MoveIN?
          </h2>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: '2rem'
          }}>
            {/* Feature 1 */}
            <div style={{ 
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#EEF2FF',
                marginBottom: '1.5rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4F46E5" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
                Prime Locations
              </h3>
              <p style={{ color: '#6B7280' }}>
                Find properties in the most sought-after neighborhoods and areas.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div style={{ 
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#EEF2FF',
                marginBottom: '1.5rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4F46E5" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
                Market Insights
              </h3>
              <p style={{ color: '#6B7280' }}>
                Get real-time market data and trends to make informed decisions.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div style={{ 
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#EEF2FF',
                marginBottom: '1.5rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4F46E5" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
                Smart Search
              </h3>
              <p style={{ color: '#6B7280' }}>
                Advanced filters to help you find exactly what you're looking for.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#F9FAFB' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '3rem' 
          }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827' }}>
              Featured Properties
            </h2>
            <Link to="/properties" className="btn btn-outline">
              View All Properties
            </Link>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            {/* Placeholder for PropertyCard components */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index} 
                style={{ 
                  height: '24rem', 
                  backgroundColor: '#F3F4F6', 
                  borderRadius: '0.75rem',
                }}
                className="animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1F2937', 
        color: 'white', 
        padding: '3rem 0', 
        marginTop: 'auto' 
      }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF' }}>© {new Date().getFullYear()} MoveIN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 