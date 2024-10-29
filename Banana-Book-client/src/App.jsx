import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import AuthView from './views/AuthView/AuthView';
import Product from './views/Product/Product';
import Profile from './views/Profile/profile';
import HomePage from './views/HomePage/HomePage';
import NewPost from './views/NewPost/NewPost';
import Explorar from './views/Explorar/Explorar';
import NotFoundView from './views/NotFoundView/NotFoundView';
import { AuthProvider } from './contexts/AuthContext';
import GlobalContainer from './Components/GlobalContainer/GlobalContainer';
import { setToken } from './api/instance';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    setToken(window.localStorage.getItem(import.meta.env.VITE_TOKEN_KEY));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalContainer>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/*" element={<AuthView />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
              <Route path="/newpost" element={<PrivateRoute Component={NewPost} />} />
              <Route path="/explorar" element={<Explorar />} />
              <Route path="*" element={<NotFoundView />} />
            </Routes>
          </div>
        </GlobalContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
