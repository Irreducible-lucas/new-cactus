// src/components/admin/UserManagement.tsx

import { UsersIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddUser from "./AddUser";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from "../../redux/auth/authApi";

interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

interface UsersApiResponse {
  data?: User[];
  success?: boolean;
  message?: string;
}

const UserManagement = () => {
  const { data, isLoading, isError } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUserRole, { isLoading: isUpdatingRole }] =
    useUpdateUserRoleMutation();

  const users: User[] = (data as UsersApiResponse)?.data || [];

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap();
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleEditRole = async (userId: string, newRole: "admin" | "user") => {
    try {
      await updateUserRole({ userId, role: newRole }).unwrap();
      alert("User role updated successfully.");
    } catch (error) {
      console.error("Failed to update user role:", error);
      alert("Failed to update user role.");
    }
  };

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading users...</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-red-500">
        Failed to load users. Please try again later.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">User Management</h2>
        <AddUser />
      </div>

      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <p className="p-4 text-gray-500">No users available.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <UsersIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        handleEditRole(
                          user._id,
                          user.role === "admin" ? "user" : "admin"
                        )
                      }
                      disabled={isUpdatingRole}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      title="Toggle role"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-900"
                      title="Delete user"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
