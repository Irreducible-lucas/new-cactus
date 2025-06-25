import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../../components/dialog";
import { plus } from "../../assets";
import { Label } from "../../../components/label";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { useState } from "react";
import { useRegisterUserMutation } from "../../redux/auth/authApi";
import { Eye, EyeOff } from "lucide-react"; // 👁️ Eye icons

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    const { name, email, phone, password } = formData;

    // Validation
    if (!name.trim()) return setError("Full name is required.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return setError("Invalid email address.");
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) return setError("Phone must be 10–15 digits.");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return setError(
        "Password must include uppercase, lowercase, number and be at least 6 characters."
      );
    }

    try {
      await registerUser({
        username: name,
        email,
        phone,
        password,
      }).unwrap();

      setFormData({ name: "", email: "", phone: "", password: "" });
      setSuccess("User added successfully.");
    } catch (err: any) {
      console.error("AddUser Error:", err);
      if (err?.data?.message) {
        setError(err.data.message);
      } else if (err?.data?.errors) {
        const messages = err.data.errors
          .map((e: any) => e.message || e.msg)
          .join(", ");
        setError(messages);
      } else {
        setError("Failed to add user.");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center bg-[#1B43C6] py-3 px-7 gap-5 rounded-md">
        <img src={plus} className="w-6 h-6" alt="Add" />
        <p className="text-xs font-semibold font-nunito text-white">Add User</p>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto w-full h-full">
        <DialogHeader>
          <DialogTitle className="text-center font-nunito text-lg font-semibold">
            Add User
          </DialogTitle>
          <DialogDescription className="text-center">
            All fields are required unless otherwise indicated.
          </DialogDescription>
          {error && (
            <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 mt-2 text-center">{success}</p>
          )}
        </DialogHeader>

        <div className="grid gap-4 my-2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Password Field with Eye Toggle */}
          <div className="grid w-full items-center gap-1.5 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="pr-10"
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="border-secondary text-secondary"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full mb-2"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
