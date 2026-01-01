import { React } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './components/SignupPage/Signup.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import CustomerDashboard from './components/Dashboard/CustomerDashboard/CustomerDashboard.jsx';
import RestaurantDashboard from './components/Dashboard/RestaurantDashboard/RestaurantDashboard.jsx';
import DeliveryDashboard from './components/Dashboard/DeliveryDashboard/DeliveryDashboard.jsx';
import Cart from './components/pages/Cart.jsx';
import Navbar from './components/Nav.jsx';
import { MenuProvider } from './components/Context/MenuContext.jsx';
import MenuCart from './components/Dashboard/CustomerDashboard/CustomerSidebar/MenuCart.jsx';
function App() {
  return (
    <>
    <MenuProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Navbar/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/customerDashboard' element={<CustomerDashboard/>}/>
        <Route path='/restaurantDashboard' element={<RestaurantDashboard/>}/>
        <Route path='/deliveryDashboard' element={<DeliveryDashboard/>}/>
      </Routes>
    </Router>
    </MenuProvider>
    </>
  )
}

export default App
