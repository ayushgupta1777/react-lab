import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data?.id ? data : null);
      } catch (err) {
        setProduct(null);
      } finally {
        setFetched(true);
      }
    }
    fetchProduct();
  }, [id]);

  if (!fetched) return null;

  if (!product) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>No product available</p>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/products" style={{ display: 'inline-block', marginBottom: '20px' }}>
        &larr; Back to Products
      </Link>
      <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '600px' }}>
        <img src={product.image} alt={product.title} style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }} />
        <h2>{product.title}</h2>
        <p>Category: {product.category}</p>
        <p style={{ fontWeight: 'bold' }}>${product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
