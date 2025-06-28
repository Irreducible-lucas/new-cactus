import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import type { RootState } from "../redux/store";
import { clearCart } from "../redux/cart/cartSlice";
import { useCreateOrderMutation } from "../redux/order/orderApi";

export default function Checkout() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const total = subtotal;

  const publicKey = "pk_live_ef447a62083e421df914f403330c64e4fdb9b960";
  const email = user?.email || "";

  const handleSuccess = async () => {
    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      await createOrder({
        user: user._id,
        items: cartItems,
      }).unwrap();
      dispatch(clearCart());
      navigate("/orders");
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  const paystackProps = {
    email,
    amount: Math.round(total * 100),
    publicKey,
    text: `Pay ₦${total.toFixed(2)}`,
    onSuccess: handleSuccess,
    onClose: () => alert("Payment closed."),
  };

  if (!user) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          You must be logged in to checkout.
        </h2>
        <Link to="/sign-in" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen p-8">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Products + Order Summary */}
        <div className="lg:col-span-2 space-y-8">
          {/* Product List */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center gap-4 border rounded-xl p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-gray-800 font-semibold">
                    ₦{Number(item.price).toFixed(2)} × {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: {(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border p-6 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment Section */}
        <div className="border p-6 rounded-xl bg-gray-50 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Payment</h3>
          <p className="text-sm text-gray-600 mb-4">
            Click the button below to complete your payment securely.
          </p>

          {email ? (
            <PaystackButton
              {...paystackProps}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            />
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Loading email...
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
