import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

export default function Favorite() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
   
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      if (favorites.length < 5) {
        setFavorites([...favorites, productId]);
      } else {
        alert('Maximum favorites limit reached.');
      }
    }
  };

  useEffect(() => {
    // Save favorites to localStorage whenever it changes
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter products to show only favorites
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  const filteredProducts = favoriteProducts.filter((product) => {
    // Filter by name, price, or any other field you want
    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery) // Convert price to string for searching
    );
  });

  return (
    <div>
      <div className="container">
        <input
          className="input-elevated my-3"
          type="text"
          placeholder="Search by name, price, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading ? (
          <div className="d-flex justify-content-center align-items-center " style={{ height: '200px' }}>
            <div className="spinner-border text-info" role="status"></div>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-3 card-product my-2">
            {filteredProducts.map((product) => (
              <div className="col mb-4 d-flex justify-content-center" key={product.id}>
                <div className="card h-100" style={{ width: "300px" }}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: "#666666" }}>
                    <img
                      src={product.images[0]}
                      className="card-img-top my-3 mx-2"
                      alt={product.title}
                      style={{ height: '100px', width: "100px", objectFit: 'cover', transition: 'transform 0.3s' }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.title} - {product.brand}
                      </h5>
                      <small className="card-text">{product.description}</small>
                      <p className="card-text">Price: ${product.price}</p>
                    </div>
                  </Link>
                  <div className="card-footer text-end" style={{ backgroundColor: "white" }}>
                    <div onClick={() => toggleFavorite(product.id)} className="">
                      {favorites.includes(product.id) ? <MdOutlineFavorite style={{ color: "red" }} /> : <MdFavoriteBorder />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
