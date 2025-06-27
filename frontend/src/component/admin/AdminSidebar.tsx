import {
  UsersIcon,
  ShoppingBagIcon,
  CubeIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/auth/authApi";
import { clearUser } from "../../redux/auth/authSlice";

type AdminSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit">
      <div className="flex items-center space-x-3 mb-8 p-2">
        <div className="bg-indigo-100 p-2 rounded-full">
          <UsersIcon className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <p className="font-medium">Admin</p>
          <p className="text-sm text-gray-500">Super Administrator</p>
        </div>
      </div>

      <nav className="space-y-1">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
            activeTab === "users"
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <UsersIcon className="h-5 w-5 mr-3" />
          User Management
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
            activeTab === "products"
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <CubeIcon className="h-5 w-5 mr-3" />
          Product Management
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
            activeTab === "orders"
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ShoppingBagIcon className="h-5 w-5 mr-3" />
          Order Management
        </button>

        <div className="border-t border-gray-200 my-2"></div>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
