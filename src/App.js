import './App.css';
import Home from './Pages/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Router, Routes } from 'react-router-dom';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CartPage from './Components/CartPage';
import Cart from './Pages/Cart';
import CheckoutPage from './Pages/CheckoutPage';
import RegisterPage from './Pages/Register';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product-details' element={<ProductDetailsPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
      
    </>
  );
}

export default App;
