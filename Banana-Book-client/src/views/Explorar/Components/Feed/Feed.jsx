import React from 'react';
import Posts from './Posts/Posts';
import BarraBusqueda from '../../../HomePage/BarraBusqueda/BarraBusqueda';
import './Feed.css';

import { toast } from 'react-toastify';
import instance from '../../../../api/instance';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

const fetchPosts = async (searchQuery) => {
  const url = searchQuery ? `/post/search/${encodeURIComponent(searchQuery)}` : '/post/search';
  const { data } = await instance.get(url);
  return data;
};

export const Feed = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search');
  
  const { data } = useQuery(['posts', searchQuery], () => fetchPosts(searchQuery), {
    refetchOnWindowFocus: false,
    onSuccess: () => {
      toast.success('Posts cargados');
    },
    onError: () => {
      toast.error('Error al cargar los posts');
    },
  });

  return (
    <main className="feed-wrapper">
      <BarraBusqueda />
      <Posts posts={data?.posts ?? []} />
    </main>
  );
};

export default Feed;
