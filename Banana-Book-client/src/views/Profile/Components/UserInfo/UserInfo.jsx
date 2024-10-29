import React from 'react';
import './UserInfo.css';

import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import instance from '../../../../api/instance';

const fetchProfile = async () => {
  const { data } = await instance.get(`/user/profile`);
  return data;
};

export const UserInfo = () => {
  const { user } = useParams();
  const { data } = useQuery('profile', fetchProfile, {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="user-info">
      <div className="userData">
        <label className="reference">Nombre</label>
        <label className="value">{data?.name}</label>
        <label className="reference">Apellido</label>
        <label className="value">{data?.lastName}</label>
        <label className="reference">Correo Electrónico</label>
        <label className="value">{data?.email}</label>
      </div>
    </div>
  );
};

export default UserInfo;
