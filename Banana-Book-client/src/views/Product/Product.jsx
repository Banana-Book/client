import React, { useEffect } from 'react';
import './Product.css';
import ProductForm from './Components/ProductForm';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Product = () => {
  const { id } = useParams();
  

  return (
    <section className="product">
      <ProductForm />
    </section>
  );
};

export default Product;
