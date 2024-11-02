import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Browse from "./Browse";
import Cart from "./Cart";

function App() {
  const [cart, setCart] = useState([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="" element={<Browse cart={cart} setCart={setCart} />} />
        <Route path="cart" element={<Cart cart={cart}/>}  />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider
        router={router}
        // What to show when loading routes
        fallbackElement={
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
      />
    </div>
  );
}

export default App;
