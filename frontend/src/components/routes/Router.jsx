import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ReactLoading from 'react-loading'
import SignUpForm from '../SignUpForm';
import EditUserForm from '../EditUserForm';
import UserPage from '../UserPage';
import HomeScreen from '../../screens/HomeScreen';
import ProductScreen from '../../screens/productScreen';
import VoteScreen from '../../screens/voteScreen';
import CategoriesScreen from '../../screens/CategoriesScreen';
import OrderScreen from '../../screens/OrderScreen';
import OrderDetailScreen from '../../screens/OrderDetailScreen';
import UsersScreen from '../../screens/UsersScreen';
import ProductEditScreen from '../../screens/ProductEditScreen';
import AddProduct from '../../screens/AddProduct';
import NotFound from '../../screens/NotFound';
import { WalletContext } from '../../context/WalletContext';
import ProductDetail from '../products/ProductDetail';
import VoteProductDetail from '../votes/VoteProductDetail';

export const Router = () => {
  const { currentAccount, user, loading } = useContext(WalletContext)

  const PrivateRoute = ( {children} ) => {
    if (!loading) {
      if (currentAccount) {
        if (user) {
          return children ;
        } else {
          return <Navigate  to='/signup' />;
        }
      } else {
        return <Navigate  to='/notfound' />;
      }
    } else {
      return <ReactLoading className="loader" type="spin" />;
    }
  };

  return (
    <Routes>
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/users/:id/edit' element={<PrivateRoute><EditUserForm /></PrivateRoute>} />
      <Route path='/users/:id' element={<PrivateRoute><UserPage /></PrivateRoute>} />
      <Route path="/" element={<PrivateRoute><HomeScreen /></PrivateRoute>} />
      <Route path="/products" element={<PrivateRoute><ProductScreen /></PrivateRoute>} />
      <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
      <Route path="/vote/:id" element={<PrivateRoute><VoteProductDetail /></PrivateRoute>} />
      <Route path="/votes" element={<PrivateRoute><VoteScreen /></PrivateRoute>} />
      <Route path="/category" element={<PrivateRoute><CategoriesScreen /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><OrderScreen /></PrivateRoute>} />
      <Route path="/order" element={<PrivateRoute><OrderDetailScreen /></PrivateRoute>} />
      <Route path="/addproduct" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><UsersScreen /></PrivateRoute>} />
      <Route path="/product/:id/edit" element={<PrivateRoute><ProductEditScreen /></PrivateRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
