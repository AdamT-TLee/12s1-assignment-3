import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


function Cart({ cart }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Create an object to track item counts
    const itemCounts = cart.reduce((itemCount, item) => {
        if (itemCount[item.id]) {
        itemCount[item.id].quantity += 1;
        } else {
        itemCount[item.id] = { ...item, quantity: 1 };
        }
        return itemCount;
    }, {});

    // Convert the object to an array for mapping
    const cartItems = Object.values(itemCounts);


    const onSubmit = (data) => {
        console.log(data);         // Log all data
        console.log(data.fullName); // Log only fullName
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" class="btn btn-secondary">
            <i className="bi bi-arrow-left-circle"></i> Return
          </Link>
        </div>
      </nav>

        <h2 className="container mt-2">Shopping Cart</h2>
        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="container">
            <ul className="list-group">
                {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                    <img src={item.image} alt={item.title} style={{ width: "100px", marginRight: "10px" }} />
                    <strong>{item.title}</strong> - ${item.price} x {item.quantity} = ${item.price * item.quantity}
                    </div>
                </li>
                ))}
            </ul>
            <div className="mt-3">
                <strong>
                Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </strong>
            </div>
            </div>
        )}
       <h2 className="container mt-5">Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div className="form-group mb-3">
                <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control" />
                {errors.fullName && <p className="text-danger">Full Name is required.</p>}
            </div>
            <div className="form-group mb-3">
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control" />
                {errors.email && <p className="text-danger">Email is required.</p>}
            </div>
            <div className="form-group mb-3">
                <input {...register("creditCard", { required: true })} placeholder="Credit Card" className="form-control" />
                {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
            </div>
            <div className="form-group mb-3">
                <input {...register("address", { required: true })} placeholder="Address" className="form-control" />
                {errors.address && <p className="text-danger">Address is required.</p>}
            </div>
            <div className="form-group mb-3">
                <input {...register("address2")} placeholder="Address 2" className="form-control" />
            </div>
            <div className="form-group mb-3">
                <input {...register("city", { required: true })} placeholder="City" className="form-control" />
                {errors.city && <p className="text-danger">City is required.</p>}
            </div>
            <div className="form-group mb-3">
                <input {...register("state", { required: true })} placeholder="State" className="form-control" />
                {errors.state && <p className="text-danger">State is required.</p>}
            </div>
            <div className="form-group mb-3">
                <input {...register("zip", { required: true })} placeholder="Zip" className="form-control" />
                {errors.zip && <p className="text-danger">Zip is required.</p>}
            </div>
            <button type="submit" className="btn btn-primary mb-3">Submit</button>
        </form>
        </div>
    );
}

export default Cart;
