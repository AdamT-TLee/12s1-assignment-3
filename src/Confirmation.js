import { Link } from "react-router-dom";

function Confirmation({cart, dataF}) {
    console.log(cart);
    console.log(dataF);

    return (
        <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container-fluid">
            <Link to="/" class="btn btn-success">
                <i className="bi bi-arrow-left-circle"></i> Continue Shopping
            </Link>
            </div>
        </nav>
        <div className="container">
            <h1>Thank you for your order!</h1>
            <h2>Order Confirmation</h2>
            <p><strong>Name:</strong> {dataF?.fullName}</p>
            <p><strong>Email:</strong> {dataF?.email}</p>
        </div>
        </div>
    );
}

export default Confirmation;