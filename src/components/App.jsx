import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Categories from './Categories/Categories';
import Products from './Products/Products';
import Users from './Users/Users';
import Orders from './Orders/Orders';
import Dashboard from './Dashboard/Dashboard';
import HeaderAndSidebar from './HeaderAndSidebar';
import NotHeaderAndSiderbar from './NotHeaderAndSiderbar';
import Auth from './Auth/Auth';
import ProductControl from './ProductControl/ProductControl';
import { useSelector } from 'react-redux';
import CategoryControl from './CategoryControl/CategoryControl';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      <CssBaseline />
      <Routes>
        <Route element={<HeaderAndSidebar />}>
          <Route
            path="/"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/products"
            element={
              isAuthenticated ? <Products /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated ? <Orders /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/users"
            element={
              isAuthenticated ? <Users /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/products/add"
            element={
              isAuthenticated ? (
                <ProductControl />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              isAuthenticated ? (
                <ProductControl />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/categories"
            element={
              isAuthenticated ? (
                <Categories />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/categories/add"
            element={
              isAuthenticated ? (
                <CategoryControl />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/categories/edit/:id"
            element={
              isAuthenticated ? (
                <CategoryControl />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Route>
        <Route element={<NotHeaderAndSiderbar />}>
          <Route
            path="/login"
            element={!isAuthenticated ? <Auth /> : <Navigate replace to="/" />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
