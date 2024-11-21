import React, { useState } from 'react';
import Posts from './Posts/Posts';
import BarraBusqueda from '../../../HomePage/BarraBusqueda/BarraBusqueda';
import './Feed.css';
import banana from '../../../../assets/img/banana.png';
import LoadingScreen from '../../../../Components/Loading/LoadingScreen';

import { toast } from 'react-toastify';
import instance from '../../../../api/instance';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

const fetchPosts = async (filters, title) => {
  try {
    const { data } = await instance.get('/post',{ params: {...filters,title} });
    return data;
  } catch (error) {
    console.log(error);
  } finally {
  }
};
export const Feed = ({filters}) => {
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('search');
  
  
  const { data } = useQuery(['posts', filters, title], () => fetchPosts(filters, title), {
    refetchOnWindowFocus: false,
    onSuccess: () => {},
    onError: () => {
      toast.error('Error al cargar los posts');
    },
  });



  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="feed-wrapper">
      <BarraBusqueda />
      <Posts posts={data?.posts ?? []} />
    </main>
  );
};

export default Feed;
