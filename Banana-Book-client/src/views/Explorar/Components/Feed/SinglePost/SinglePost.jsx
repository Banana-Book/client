import React from 'react';
import './SinglePost.css';

export const SinglePost = ({ title = '', price = '', category = '', image = '', user = '', email = '' }) => {
  

  return (
    <div className="publicacion">
      <img src={image} alt="imagen de libro" />

      <div>
        <h3>{title}</h3>
        <p>{user}</p>
        <p>Categoria: {category}</p>
        <p>Precio: ${price}</p>
      </div>
    </div>
  );
};

export default SinglePost;
