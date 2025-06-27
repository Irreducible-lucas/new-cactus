// components/Cart.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { removeFromCart, updateQuantity } from "../redux/cart/cartSlice";
import { Link } from "react-router-dom";
import { AlsoAvailable } from "../component";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // const shipping = subtotal > 200 ? 0 : 15.99;
  // const tax = subtotal * 0.08;
  const total = subtotal;

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

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
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                <p className="text-gray-800 font-semibold">₦{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  className="bg-gray-200 px-2 py-1 rounded"
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:underline ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border p-6 rounded-xl bg-gray-50 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div> */}
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{total.toFixed(2)}</span>
            </div>
          </div>

          <Link to={"/checkout"}>
            <button className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition">
              Checkout
            </button>
          </Link>
        </div>
      </div>

      <div>
        <AlsoAvailable />
      </div>
    </section>
  );
}
