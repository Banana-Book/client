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

export const Feed = ({filters}) => {
  const [loading, setLoading] = useState(false);
  
  const fetchPosts = async (filters) => {
    setLoading(true);
    try {
      const { data } = await instance.get('/post',{ params: filters });
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const { data } = useQuery(['posts'], fetchPosts, {
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
