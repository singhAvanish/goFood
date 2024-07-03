
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import SignUp from './screens/SignUp.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrders from './screens/MyOrders.jsx';

function App() {
  return (
    <CartProvider>
     <div>
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/createuser' element={<SignUp/>}></Route>
      <Route path='/myOrder' element={<MyOrders/>}></Route>
    </Routes>
   </Router>
   
   </div>

    </CartProvider>
  
  );
}

export default App;
