import React from 'react';
import { Link } from 'react-router-dom';
import SinglePost from '../SinglePost/SinglePost';

import './Posts.css';

export const Posts = ({ posts = [] }) => {
  const mappedPosts = posts?.map((post) => {
    return (
      <Link to={`/product/${post._id}`} key={post._id} style={{ textDecoration: 'none' }}>
        <SinglePost
          key={post._id}
          title={post.title}
          price={post.price}
          user={`${post?.user?.name} ${post?.user?.lastName}`}
          category={post.category}
          image={post.image}
        />
      </Link>
    );
  });

  return (
    <section>
      <h3>Resultados</h3>
      {mappedPosts}
    </section>
  );
};

export default Posts;
