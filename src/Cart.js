import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object({
    fullName: yup.string().required("Full name is required."),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address."),
    creditCard: yup
      .mixed()
      .transform((value) => value.replace(/[ -]/g, ""))
      .test("length", "Invalid credit card.", (num) => num.length === 16)
      .required("Credit card is required."),

    address: yup.string().required("Address is required."),
    address2: yup.string(),
    city: yup.string().required("City is required."),
    state: yup.string().required("State is required."),
    zip: yup
      .number()
      .typeError("Invalid ZIP.")
      .positive("Invalid ZIP.")
      .integer("Invalid ZIP.")
      .test("length", "Invalid ZIP.", (zip) => zip.toString().length === 5)
      .required("ZIP is required."),
  })
  .required();

function Cart({ cart, setFormData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

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

  // Handle form submission
  const navigate = useNavigate();
  const onSubmit = (dataF, e) => {
    e.preventDefault();

    setFormData(dataF);
    console.log(dataF); // Log all data
    console.log(dataF.fullName); // Log only fullName

    if (cartItems.length != 0) {
      navigate("/confirmation");
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="btn btn-secondary">
            <i className="bi bi-arrow-left-circle"></i> Return
          </Link>
        </div>
      </nav>

      <h2 className="container mt-2">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="container">Your cart is empty.</div>
      ) : (
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
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </strong>
          </div>
        </div>
      )}
      <h2 className="container mt-5">Checkout</h2>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="container mb-5"
      >
        <div className="row">
          <div className="col">
            <label htmlFor="fullNameInput" className="form-label">
              Full Name
            </label>
            <div className="form-group mb-3">
              <input
                id="fullNameInput"
                {...register("fullName")}
                placeholder="John Doe"
                className="form-control"
              />
              {errors.fullName && (
                <p className="text-danger">{errors.fullName?.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <div className="form-group mb-3">
              <input
                id="emailInput"
                {...register("email")}
                placeholder="example@gmail.com"
                className="form-control"
              />
              {errors.email && (
                <p className="text-danger">{errors.email?.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="creditCardInput" className="form-label">
              Credit Card
            </label>
            <div className="form-group mb-3">
              <div className="input-group">
                <i className="input-group-text bi bi-credit-card-fill"></i>
                <input
                  id="creditCardInput"
                  {...register("creditCard")}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="form-control"
                  maxLength={19}
                  onChange={(element) => {
                    let string = element.target.value;

                    let groups = string.replace(/[ -]/g, "").match(/.{1,4}/g);

                    element.target.value = groups ? groups.join(" ") : "";
                  }}
                />
              </div>
              {errors.creditCard && (
                <p className="text-danger">{errors.creditCard?.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="addressInput" className="form-label">
              Address
            </label>
            <div className="form-group mb-3">
              <input
                id="addressInput"
                {...register("address")}
                placeholder="1234 Main St"
                className="form-control"
              />
              {errors.address && (
                <p className="text-danger">{errors.address?.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <label htmlFor="address2Input" className="form-label">
              Address 2
            </label>
            <div className="form-group mb-3">
              <input
                id="address2Input"
                {...register("address2")}
                placeholder="Apartment, studio, or floor"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <label htmlFor="cityInput" className="form-label">
              City
            </label>
            <div className="form-group mb-3">
              <input
                id="cityInput"
                {...register("city")}
                className="form-control"
              />
              {errors.city && (
                <p className="text-danger">{errors.city?.message}</p>
              )}
            </div>
          </div>
          <div className="col-2">
            <label htmlFor="stateInput" className="form-label">
              State
            </label>
            <div className="form-group mb-3">
              <select
                id="stateInput"
                {...register("state")}
                className="form-select"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="AK">Alaska</option>
                <option value="AL">Alabama</option>
                <option value="AR">Arkansas</option>
                <option value="AZ">Arizona</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DC">District of Columbia</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="IA">Iowa</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="MA">Massachusetts</option>
                <option value="MD">Maryland</option>
                <option value="ME">Maine</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MO">Missouri</option>
                <option value="MS">Mississippi</option>
                <option value="MT">Montana</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="NE">Nebraska</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NV">Nevada</option>
                <option value="NY">New York</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="PR">Puerto Rico</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VA">Virginia</option>
                <option value="VT">Vermont</option>
                <option value="WA">Washington</option>
                <option value="WI">Wisconsin</option>
                <option value="WV">West Virginia</option>
                <option value="WY">Wyoming</option>
              </select>
              {errors.state && (
                <p className="text-danger">{errors.state?.message}</p>
              )}
            </div>
          </div>
          <div className="col-2">
            <label htmlFor="zipInput" className="form-label">
              ZIP
            </label>
            <div className="form-group mb-3">
              <input
                id="zipInput"
                {...register("zip")}
                className="form-control"
                maxLength={5}
              />
              {errors.zip && (
                <p className="text-danger">{errors.zip?.message}</p>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          <i className="bi bi-cart4"></i> Order
        </button>
        {cartItems.length === 0 && (
          <p className="text-danger">Cart is empty.</p>
        )}
      </form>
    </div>
  );
}

export default Cart;
