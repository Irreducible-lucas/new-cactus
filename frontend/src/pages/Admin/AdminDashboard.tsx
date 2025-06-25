import {
  AdminSidebar,
  Analytics,
  DashboardOverview,
  OrderManagement,
  ProductManagement,
  UserManagement,
} from "../../component/admin";
import { useState } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderActiveTab = () => {
    switch (activeTab) {
      // case "overview":
      //   return <DashboardOverview />;
      case "users":
        return <UserManagement />;
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      // case "analytics":
      //   return <Analytics />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <div className="flex-1">{renderActiveTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
