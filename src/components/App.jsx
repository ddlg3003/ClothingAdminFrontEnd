import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Categories from './Categories/Categories';
import Products from './Products/Products';
import Users from './Users/Users';
import Orders from './Orders/Orders';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import useStyles from './styles'
import Dashboard from './Dashboard/Dashboard';

const App = () => {
    const classes = useStyles();

    return (
        <div>
            <CssBaseline />
            <Header />
            <Sidebar />
            <main className={classes.main}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </main>
        </div>
    )
}

export default App;