import { Routes, Route, Navigate } from 'react-router-dom';
import Guard from './Guard';
//pages
import AuthenticationPage from './AuthenticationPage';
import TodosPage from './TodosPage';
import { useAppSelector } from '../hooks';

const AllPages = () => {
 const { isAuthenticated } = useAppSelector((state) => state.auth);

  //const isAuthenticated = false
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/todos" />
          ) : (
            <AuthenticationPage />
          )
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated  ? (
            <Navigate to="/todos" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route element={<Guard />}>
        {isAuthenticated && (
          <Route
            path="/todos/"
            element={
              isAuthenticated  ? <TodosPage /> : <AuthenticationPage />
            }
          />
          
        )}
        <Route path="*" element={<Navigate to="/todos" />} />

      </Route>
    </Routes>
  );
};

export default AllPages;
