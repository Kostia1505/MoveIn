import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const PropertyCard = ({ property }) => {
  const { isDarkMode } = useTheme();
  const { 
    _id, 
    title, 
    price,
    listingType, 
    propertyType, 
    area, 
    bedrooms, 
    bathrooms, 
    location,
    images 
  } = property;

  // Format price with commas and currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Default image if none provided
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : 'https://via.placeholder.com/400x300?text=No+Image+Available';

  // Theme-based styles
  const cardStyle = {
    backgroundColor: isDarkMode ? '#1F2937' : 'white',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: isDarkMode 
      ? '0 2px 15px -3px rgba(0, 0, 0, 0.3)' 
      : '0 2px 15px -3px rgba(0, 0, 0, 0.07)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const titleStyle = {
    fontSize: '1.125rem', 
    fontWeight: 600, 
    color: isDarkMode ? '#E5E7EB' : '#111827',
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const titleLinkStyle = {
    color: 'inherit', 
    textDecoration: 'none', 
    transition: 'color 0.2s'
  };

  const locationStyle = {
    fontSize: '0.875rem', 
    color: isDarkMode ? '#9CA3AF' : '#6B7280', 
    marginBottom: '1rem',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  };

  const priceStyle = {
    fontSize: '1.125rem', 
    fontWeight: 700, 
    color: isDarkMode ? '#60A5FA' : '#4F46E5'
  };

  const priceSuffixStyle = {
    fontSize: '0.875rem', 
    color: isDarkMode ? '#9CA3AF' : '#6B7280'
  };

  const dividerStyle = {
    borderTop: isDarkMode ? '1px solid #374151' : '1px solid #F3F4F6', 
    paddingTop: '1rem', 
    marginTop: 'auto'
  };

  const featuresStyle = {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    fontSize: '0.875rem', 
    color: isDarkMode ? '#9CA3AF' : '#6B7280'
  };

  const iconStyle = {
    height: '1.25rem', 
    width: '1.25rem', 
    marginRight: '0.25rem', 
    color: isDarkMode ? '#6B7280' : '#9CA3AF'
  };

  const cardHoverStyle = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = isDarkMode 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.4)' 
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
  };

  const cardLeaveStyle = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = isDarkMode 
      ? '0 2px 15px -3px rgba(0, 0, 0, 0.3)' 
      : '0 2px 15px -3px rgba(0, 0, 0, 0.07)';
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={cardHoverStyle}
      onMouseLeave={cardLeaveStyle}
      className="card"
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Link to={`/properties/${_id}`}>
          <img 
            src={imageUrl} 
            alt={title} 
            style={{
              width: '100%',
              height: '16rem',
              objectFit: 'cover',
              transition: 'transform 0.5s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: '9999px',
              backgroundColor: listingType === 'rent' ? '#14B8A6' : '#4F46E5',
              color: 'white'
            }}>
              {listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>
        </Link>
      </div>

      <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <h3 style={titleStyle}>
              <Link 
                to={`/properties/${_id}`} 
                style={titleLinkStyle} 
                onMouseOver={(e) => e.target.style.color = isDarkMode ? '#60A5FA' : '#4F46E5'} 
                onMouseOut={(e) => e.target.style.color = isDarkMode ? '#E5E7EB' : '#111827'}
              >
                {title}
              </Link>
            </h3>
            <span style={priceStyle}>
              {formatPrice(price)}
              {listingType === 'rent' && <span style={priceSuffixStyle}>/mo</span>}
            </span>
          </div>
          <p style={locationStyle}>
            {location.city}
            {location.neighborhood && `, ${location.neighborhood}`}
            {location.address && `, ${location.address}`}
          </p>
        </div>

        <div style={dividerStyle}>
          <div style={featuresStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{propertyType}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>{area} sq ft</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{bedrooms} bd</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <span>{bathrooms} ba</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;