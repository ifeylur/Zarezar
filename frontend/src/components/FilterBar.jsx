import React, { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    skinType: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem'
    }}>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600',
        marginBottom: '1.5rem',
        color: '#333'
      }}>
        Filters
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleChange}
          style={{
            padding: '0.8rem 1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
        <select 
          name="category" 
          value={filters.category} 
          onChange={handleChange}
          style={{
            padding: '0.8rem 1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '1rem',
            outline: 'none',
            background: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        >
          <option value="">All Categories</option>
          <option value="face scrub">Face Scrub</option>
          <option value="face mask">Face Mask</option>
        </select>
        <select 
          name="skinType" 
          value={filters.skinType} 
          onChange={handleChange}
          style={{
            padding: '0.8rem 1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '1rem',
            outline: 'none',
            background: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        >
          <option value="">All Skin Types</option>
          <option value="Oily">Oily</option>
          <option value="Dry">Dry</option>
          <option value="Combination">Combination</option>
          <option value="Sensitive">Sensitive</option>
          <option value="Normal">Normal</option>
          <option value="All">All</option>
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          style={{
            padding: '0.8rem 1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          style={{
            padding: '0.8rem 1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
      </div>
    </div>
  );
};

export default FilterBar;

