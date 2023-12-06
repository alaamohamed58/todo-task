import React, { Fragment } from 'react';
import { useAppSelector } from '../hooks';
import { Navigate, Outlet } from 'react-router-dom';

const Guard: React.FC = () => {
   const { isAuthenticated } = useAppSelector((state) => state.auth);
  //const isAuthenticated = false
  return (
    <Fragment>
      {isAuthenticated  && <Outlet />}
      {(!isAuthenticated  || isAuthenticated === null) && (
        <Navigate to="/login" />
      )}
    </Fragment>
  );
};

export default Guard;
