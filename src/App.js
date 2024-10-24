import Header from './Components/header/header';
import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom';
import Login from './Components/login/login.js';
import Signup from "./Components/login/signup.js"
import AppContext from "./AppContext.js"
import Home from "./Components/home/home.js"
import Cart from './Components/cart/cart.js';

function App() {

  const routes = createBrowserRouter([
    {path: "/", element: <Header />, children:[
      {path: "/", element:<Home />},
      {path: "/login", element:<Login />},
      {path: "/signup", element:<Signup />},
      {path: "/cart", element:<Cart />}
    ]},])
  return (
    <AppContext>
    <RouterProvider router={routes} />
    </AppContext>
  );
}

export default App;
