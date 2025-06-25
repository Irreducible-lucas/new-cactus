import { LineChart, BarChart } from "../ChartComponent";

const Analytics = () => {
  // Mock data for charts
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        borderColor: "rgb(79, 70, 229)",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const userData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [45, 78, 56, 89, 45, 67],
        backgroundColor: "rgba(79, 70, 229, 0.8)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Sales Overview
          </h3>
          <div className="h-64">
            <LineChart data={salesData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            User Growth
          </h3>
          <div className="h-64">
            <BarChart data={userData} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Tesla Model S
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  56
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $5,039,440
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3.2%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Ford Mustang Mach-E
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  34
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $1,768,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2.1%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  BMW i4 M50
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  28
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $1,884,400
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1.8%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
