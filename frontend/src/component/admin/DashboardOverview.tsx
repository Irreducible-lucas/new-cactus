import {
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    name: "Total Revenue",
    value: "$89,400",
    icon: CurrencyDollarIcon,
    change: "+12%",
    changeType: "positive",
  },
  {
    id: 2,
    name: "Total Users",
    value: "1,234",
    icon: UserGroupIcon,
    change: "+19%",
    changeType: "positive",
  },
  {
    id: 3,
    name: "New Orders",
    value: "56",
    icon: ShoppingCartIcon,
    change: "+2.6%",
    changeType: "positive",
  },
  {
    id: 4,
    name: "Conversion",
    value: "3.2%",
    icon: ArrowTrendingUpIcon,
    change: "-0.5%",
    changeType: "negative",
  },
];

const recentActivity = [
  { id: 1, user: "John Doe", action: "placed an order", time: "2 minutes ago" },
  { id: 2, user: "Jane Smith", action: "registered", time: "10 minutes ago" },
  {
    id: 3,
    user: "Robert Johnson",
    action: "purchased a product",
    time: "25 minutes ago",
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "requested a refund",
    time: "1 hour ago",
  },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <UsersIcon className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}{" "}
                    <span className="text-gray-500 font-normal">
                      {activity.action}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
