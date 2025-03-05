import './App.css';
import Home from './Pages/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import Cart from './Pages/Cart';
import CheckoutPage from './Pages/CheckoutPage';
import RegisterPage from './Pages/Register';
import LoginPage from './Components/Login';
import Wishlist from './Pages/Wishlist';
import MyAccount from './Pages/MyAccount';
import MyOrder from './Pages/MyOrder';
import TermsAndConditionPage from './Pages/TermsAndConditionPage';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage';
import ReviewRating from './Pages/ReviewRatingPage';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product-details' element={<ProductDetailsPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/profile' element={<MyAccount/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>
        <Route path='/terms-conditons' element={<TermsAndConditionPage/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicyPage/>}/>
        <Route path='/review-rating' element={<ReviewRating/>}/>
      </Routes>
      
    </>
  );
}

export default App;
