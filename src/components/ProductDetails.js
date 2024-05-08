import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { IoArrowBack } from "react-icons/io5";

import '../productcard.css'
const generateStarRating = (ratingText) => {
  const rating = parseInt(ratingText, 10);
  return Array.from({ length: 5 }, (_, index) => (index + 1 <= rating ? '⭐️' : '☆')).join('');
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);



 

  

  return (
    <div className='my-3 py-2 '>
      <Link to={'/'} className='mx-2 px-2'>
        <IoArrowBack style={{color:"black" }} />
      </Link>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center " style={{height:'200px'}}>
          <div className="spinner-border text-info" role="status"></div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div >
          <div className="card-inner px-2 py-2 details" >
           
             
            
              <div >
                <img src={product.images[0]} alt={product.title} style={{width:"200px"}} />
              </div>
              <h3 className='px-2'>{product.title} - {product.brand}</h3>
              <span  className='px-2'>{generateStarRating(product.rating)}</span>
          
           
             
             
              <p className='px-2'>{product.description}</p>
              <p className='px-2'>Price: $ {product.price}</p>
              <p className='px-2'>Discount: {product.discountPercentage} %</p>
              <p className='px-2 mb-2'>Stocks: {product.stock}</p>
              <div className="card-footer text-end">
                
                </div>
              </div>
            </div>
         
       
      )}
    </div>
  );
}
