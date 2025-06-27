import { useGetOrdersQuery } from "../redux/order/orderApi";

export default function Order() {
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading your orders...
      </div>
    );
  }

  if (isError || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <section className="min-h-screen p-8">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      <div className="space-y-6">
        {orders.map((order) =>
          order.items.map((item: any) => (
            <div
              key={`${order._id}-${item.id}`}
              className="flex items-center gap-4 border rounded-xl p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <p className="text-gray-800">
                  ₦{item.price} × {item.quantity}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Order ID: {order._id}
                </p>
                <p className="text-gray-400 text-xs">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
