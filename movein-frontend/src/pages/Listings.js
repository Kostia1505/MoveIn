import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import propertyApi from '../api/propertyApi';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [searchParams] = useSearchParams();
  
  // Extract filters from URL query params
  const listingType = searchParams.get('type') || ''; // 'rent' or 'sale'
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const minBedrooms = searchParams.get('beds') || '';
  const city = searchParams.get('city') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // Skip API call attempt for now since backend isn't running
        // Instead, use mock data directly
        console.log("Using mock data since backend is not running");
        
        const mockProperties = Array.from({ length: 9 }, (_, i) => ({
          _id: `property-${i + 1}`,
          title: `Beautiful ${['Apartment', 'House', 'Penthouse', 'Studio'][i % 4]} in ${['New York', 'Los Angeles', 'Chicago', 'Miami'][i % 4]}`,
          description: 'This stunning property features modern amenities, spacious rooms, and a prime location close to everything.',
          price: 500000 + (i * 100000),
          listingType: i % 2 === 0 ? 'sale' : 'rent',
          propertyType: ['apartment', 'house', 'penthouse', 'studio'][i % 4],
          area: 1000 + (i * 100),
          bedrooms: 1 + (i % 4),
          bathrooms: 1 + (i % 3),
          location: {
            address: `${1000 + i} Main Street`,
            city: ['New York', 'Los Angeles', 'Chicago', 'Miami'][i % 4],
            state: ['NY', 'CA', 'IL', 'FL'][i % 4],
            zipCode: `1000${i}`,
          },
          images: [`https://via.placeholder.com/800x600/F8FAFC/E2E8F0?text=Property+${i + 1}`],
        }));
        
        setProperties(mockProperties);
        setPagination({
          total: 54,
          page: page,
          limit: 9,
          pages: 6
        });
        
        // Simulate a small delay to show loading state
        setTimeout(() => {
          setLoading(false);
        }, 500);
        
      } catch (err) {
        console.error("Error:", err);
        setError('Failed to load properties. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [listingType, minPrice, maxPrice, minBedrooms, city, page]);
  
  // Render loading skeleton
  const renderSkeleton = () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '2rem' 
    }}>
      {Array.from({ length: 9 }).map((_, index) => (
        <div 
          key={index} 
          style={{ 
            height: '24rem', 
            backgroundColor: '#F3F4F6', 
            borderRadius: '0.75rem'
          }}
          className="animate-pulse"
        />
      ))}
    </div>
  );
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flexGrow: 1, padding: '3rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {listingType === 'rent' ? 'Properties for Rent' : 
               listingType === 'sale' ? 'Properties for Sale' : 
               'All Properties'}
            </h1>
            {city && <p style={{ color: '#4B5563' }}>Location: {city}</p>}
          </div>
          
          {/* Filter options would go here */}
          
          {/* Error message */}
          {error && (
            <div style={{ 
              backgroundColor: '#FEF2F2', 
              color: '#DC2626', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '2rem' 
            }}>
              {error}
            </div>
          )}
          
          {/* Properties grid */}
          {loading ? (
            renderSkeleton()
          ) : (
            <>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '2rem' 
              }}>
                {properties.map(property => (
                  <PropertyCard key={property._id} property={{
                    ...property,
                    location: property.location || { city: 'Unknown', neighborhood: '', address: '' }
                  }} />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination && (
                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                  <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {Array.from({ length: pagination.pages }).map((_, i) => (
                      <a 
                        key={i}
                        href={`?page=${i + 1}`}
                        style={{ 
                          padding: '0.5rem 1rem', 
                          borderRadius: '0.375rem',
                          backgroundColor: pagination.page === i + 1 ? '#4F46E5' : 'white',
                          color: pagination.page === i + 1 ? 'white' : '#374151',
                          textDecoration: 'none'
                        }}
                      >
                        {i + 1}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      {/* Footer removed - using Layout component footer instead */}
    </div>
  );
};

export default Listings; 