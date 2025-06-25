import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import {
  useEditProfileMutation,
  useChangePasswordMutation,
  useLogoutUserMutation,
} from "../redux/auth/authApi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clearUser, setUser } from "../redux/auth/authSlice";

type PasswordChangeForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [editProfile, { isLoading: updatingProfile }] =
    useEditProfileMutation();
  const [changePassword, { isLoading: changingPassword }] =
    useChangePasswordMutation();
  const [logoutUser] = useLogoutUserMutation();

  const [profile, setProfile] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordChangeForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await editProfile(profile).unwrap();
      dispatch(setUser(res.user));
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      return setError("New passwords do not match");
    }

    if (newPassword.length < 8) {
      return setError("Password must be at least 8 characters long");
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setSuccess("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to change password");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser());
      navigate("/sign-in");
    } catch (err: any) {
      setError(err?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} aria-label="Edit Profile">
            <Pencil
              size={20}
              className="text-gray-500 hover:text-blue-600 transition"
            />
          </button>
        )}
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
          {error}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Username"
            name="username"
            value={profile.username}
            onChange={handleProfileChange}
            isEditing={isEditing}
          />
          <InputField
            label="Phone Number"
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
            isEditing={isEditing}
          />
        </div>

        <InputField
          label="Email Address"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          isEditing={isEditing}
        />

        {isEditing && (
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {updatingProfile ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>

      {/* Change Password */}
      <div className="border-t pt-6 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Change Password
        </h3>
        {showPasswordForm ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <PasswordInputField
              label="Current Password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />
            <PasswordInputField
              label="New Password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
            />
            <PasswordInputField
              label="Confirm New Password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
            />
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                {changingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="w-full px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded hover:bg-blue-100"
          >
            Change Password
          </button>
        )}
      </div>

      {/* Logout */}
      <div className="border-t pt-4">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm text-red-600 bg-red-50 rounded hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Input Field Component
function InputField({
  label,
  name,
  value,
  onChange,
  isEditing,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isEditing: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="py-2 px-3 bg-gray-50 rounded border text-sm text-gray-800">
          {value}
        </p>
      )}
    </div>
  );
}

// Password Input Component
function PasswordInputField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}
