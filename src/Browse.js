import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Browse({ cart, setCart, catalog }) {
  // Products data of currently displayed products
  const [viewCatalog, setViewCatalog] = useState([]);

  // Load initial cards from catalog data
  useEffect(() => {
    setViewCatalog(catalog);
  }, [catalog]);

  // Adds an item to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Removes product from cart
  const removeFromCart = (item) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === item.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  // Returns number of item in cart given an item id
  const howManyOfThis = (id) => {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  };

  // Updates the cards based on the search filter
  const filterCatalog = (search) => {
    // Filter catalog
    const searchTerms = search.trim().split(" ");
    const updatedCatalog = catalog.filter((item) => {
      for (let term of searchTerms) {
        if (
          !item.title.toLowerCase().trim().includes(term.toLowerCase().trim())
        ) {
          return false;
        }
      }

      return true;
    });

    // Update catalog
    setViewCatalog(updatedCatalog);
  };

  // A list of visible product cards
  const shoppingItems = viewCatalog.map((item) => (
    <div className="col justify-content-center" key={item.id}>
      <div className="card w-100 h-100">
        <div className="card-header bg-white">
          <img
            src={item.image.url}
            className="card-img-top img-fluid p-4 object-fit-contain"
            style={{ maxHeight: "27rem", minHeight: "27rem" }}
            alt="..."
          />
        </div>

        <div className="card-body">
          <h5 className="card-title">
            <span className="px-2 bg-success rounded-4 text-light">
              ${item.price}
            </span>{" "}
            {item.title}
          </h5>
          <hr />
          <div className="my-3 card-text">{item.description}</div>
        </div>
        <div className="card-footer">
          <div className="input-group align-items-end">
            <span className="input-group-text">#</span>

            <input
              type="number"
              className="form-control"
              onChange={() => howManyOfThis(item.id)}
              value={howManyOfThis(item.id)}
              readOnly
            />
            <button
              className="btn btn-outline-success btn-light"
              onClick={() => addToCart(item)}
            >
              +
            </button>
            <button
              className="btn btn-outline-success btn-light"
              onClick={() => removeFromCart(item)}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <div className="d-flex">
            <input
              id="catalogSearch"
              name="searchInput"
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onInput={(e) => {
                filterCatalog(e.target.value);
              }}
            />
          </div>
          <Link to="/cart" className="btn btn-primary">
            <i className="bi bi-arrow-right-circle"></i> Checkout
          </Link>
        </div>
      </nav>

      <div className="container">
        <div
          className="mt-4 row row-cols-1 row-cols-md-2 
                    row-cols-lg-3 g-4 mb-3"
        >
          {shoppingItems}
        </div>
      </div>
    </div>
  );
}

export default Browse;
