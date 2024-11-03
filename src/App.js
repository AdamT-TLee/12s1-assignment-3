import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Browse from "./Browse";
import Cart from "./Cart";
import Confirmation from "./Confirmation";

function App() {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({});

  // Get product data on first render
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./data.json");
      const data = await response.json();

      setCatalog(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const clearCart = () => {
    setCart([]); // Clear the cart
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path=""
          element={<Browse cart={cart} setCart={setCart} catalog={catalog} />}
        />
        <Route
          path="cart"
          element={<Cart cart={cart} setFormData={setFormData} />}
        />
        <Route
          path="confirmation"
          element={
            <Confirmation cart={cart} dataF={formData} clearCart={clearCart} />
          }
        />
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
