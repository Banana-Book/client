import React from 'react';
import Posts from './Posts/Posts';
import BarraBusqueda from '../../../HomePage/BarraBusqueda/BarraBusqueda';
import './Feed.css';

import { toast } from 'react-toastify';
import instance from '../../../../api/instance';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
  const { data } = await instance.get('/post');
  return data;
};

export const Feed = () => {
  const { data } = useQuery(['posts'], fetchPosts, {
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
