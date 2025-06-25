import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "../../redux/order/orderApi";

const ORDERS_PER_PAGE = 5;

const OrderManagement = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId).unwrap();
        refetch();
      } catch (err) {
        console.error("Failed to delete order:", err);
      }
    }
  };

  const totalPages = orders ? Math.ceil(orders.length / ORDERS_PER_PAGE) : 1;
  const paginatedOrders = orders?.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) return <p className="p-4">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load orders.</p>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Order Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer Info
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ordered Items
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOrders?.map((order) => {
              const customer = order.user || {};
              const total = order.items?.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              return (
                <tr key={order._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <p className="font-semibold text-gray-900">
                      {customer.username || "Guest"}
                    </p>
                    <p>{customer.email || "N/A"}</p>
                    <p className="text-sm text-gray-400">
                      {customer.phone || "N/A"}
                    </p>
                  </td>
                  <td className="py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    $
                    {total?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-4 text-sm text-gray-700">
                    <ul className="list-disc pl-3 space-y-2">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} × {item.quantity} — ${item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-8 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={isDeleting}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 border-t">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderManagement;
