import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Product List</h1>
        <Link
          to="/admin/products/add"
          style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', textDecoration: 'none' }}
        >
          Add New Product
        </Link>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Stock</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '1rem' }}>{product.name}</td>
              <td style={{ padding: '1rem' }}>{product.category}</td>
              <td style={{ padding: '1rem' }}>${product.price}</td>
              <td style={{ padding: '1rem' }}>{product.stock}</td>
              <td style={{ padding: '1rem' }}>
                <Link
                  to={`/admin/products/edit/${product._id}`}
                  style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  style={{ padding: '0.25rem 0.5rem', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && <p>No products found.</p>}
    </div>
  );
};

export default ProductList;

