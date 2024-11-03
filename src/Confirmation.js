import { Link } from "react-router-dom";

function Confirmation({ cart, dataF, clearCart }) {
  console.log(dataF);
  console.log(cart);

  const itemCounts = cart.reduce((itemCount, item) => {
    if (itemCount[item.id]) {
      itemCount[item.id].quantity += 1;
    } else {
      itemCount[item.id] = { ...item, quantity: 1 };
    }
    return itemCount;
  }, {});

  const cartItems = Object.values(itemCounts);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="btn btn-success" onClick={clearCart}>
            <i className="bi bi-arrow-left-circle"></i> Continue Shopping
          </Link>
        </div>
      </nav>
      {Object.values(dataF).length > 0 ? (
        <div>
          <div className="container mt-4">
            <h1>Thank you for your order!</h1>
            <h2>Order Confirmation</h2>
            <p>
              <strong>Name:</strong> {dataF?.fullName}
            </p>
            <p>
              <strong>Email:</strong> {dataF?.email}
            </p>
            <p>
              <strong>Credit Card:</strong>{" "}
              {dataF?.creditCard
                .replace(/\d(?=\d{4})/g, "*")
                .match(/.{1,4}/g)
                .join(" ")}
            </p>
            <p>
              <strong>Address:</strong> {dataF?.address}
            </p>
            {dataF.address2 && (
              <p>
                <strong>Address 2:</strong> {dataF?.address2}
              </p>
            )}
            <p>
              <strong>City:</strong> {dataF?.city}
            </p>
            <p>
              <strong>State:</strong> {dataF?.state}
            </p>
            <p>
              <strong>Zip:</strong> {dataF?.zip}
            </p>
          </div>
          <div className="container">
            <ul className="list-group">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                    <strong>{item.title}</strong> - ${item.price} x{" "}
                    {item.quantity} = ${item.price * item.quantity}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <strong>
                Total: $
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <h1>Error: Cannot give confirmation of nonexistent purchase</h1>
        </div>
      )}
    </div>
  );
}

export default Confirmation;
