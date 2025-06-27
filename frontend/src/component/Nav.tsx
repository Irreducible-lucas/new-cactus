// Navbar.tsx
import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  Heart,
  X,
  ChevronRight,
  Package,
} from "lucide-react";
import { logo } from "../assets";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { clearUser as logoutAction } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AnimatedLogo from "./AnimatedLogo";

const allNavItems = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explores" },
  { label: "Frame", href: "/frame" },
  { label: "Painting", href: "/painting" },
  { label: "Home Decor", href: "/home-decor" },
  { label: "Furniture", href: "/furniture" },
  {
    label: "Login",
    href: "/sign-in",
    showInTopRight: true,
    showInDrawer: true,
  },
  {
    label: "Signup",
    href: "/sign-up",
    showInTopRight: true,
    showInDrawer: true,
  },
  {
    label: "Favourites",
    href: "/wishlist",
    icon: <Heart className="h-5 w-5" />,
    showInTopRight: true,
    showInDrawer: true,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: <ShoppingCart className="h-5 w-5" />,
    showInTopRight: true,
    showInDrawer: true,
  },
];

const getInitials = (name: string) => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1)
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  return initials;
};

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const cartCount = cartItems?.length || 0;

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAction());
    setIsDrawerOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(mobileSearchTerm.trim())}`);
      setIsDrawerOpen(false);
      setMobileSearchTerm("");
    }
  };

  const rightNavItems = user
    ? [
        {
          label:
            user.role === "admin" ? "Dashboard" : getInitials(user.username),
          href: user.role === "admin" ? "/dashboard/user" : "/profile",
          className:
            user.role === "admin"
              ? "text-sm font-semibold"
              : "flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold",
        },
        {
          label: "Favourites",
          href: "/wishlist",
          icon: <Heart className="h-5 w-5" />,
        },
        {
          label: "Cart",
          href: "/cart",
          icon: (
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          ),
        },
        {
          label: "Orders",
          href: "/orders",
          icon: <Package className="h-5 w-5" />,
        },
      ]
    : allNavItems
        .filter((item) => item.showInTopRight)
        .map((item) => {
          if (item.label === "Cart") {
            return {
              ...item,
              icon: (
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              ),
            };
          }
          return item;
        });

  return (
    <>
      <nav className="w-full bg-white fixed z-50 top-0 border-b-4 border-blue-700">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <a href="/" className="flex items-center space-x-2 ">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 lg:w-12 lg:h-12 "
              />
              <AnimatedLogo />
            </a>
          </div>

          <form onSubmit={handleSearch} className="flex-1 mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Retro arcade carpet themed decor"
                className="w-full py-2 pl-4 pr-10 rounded-md bg-gray-100 text-sm border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit">
                <Search className="absolute top-2.5 right-3 h-5 w-5 text-blue-700" />
              </button>
            </div>
          </form>

          <div className="hidden md:flex items-center space-x-6">
            {rightNavItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`text-sm font-semibold flex items-center space-x-1 ${
                  item.className || ""
                }`}
              >
                {item.icon || <span>{item.label}</span>}
              </a>
            ))}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {rightNavItems
              .filter((item) => item.icon)
              .map((item, index) => (
                <a key={index} href={item.href}>
                  {item.icon}
                </a>
              ))}
          </div>
        </div>

        <form
          onSubmit={handleMobileSearch}
          className="md:hidden px-4 pb-3 mt-2"
        >
          <div className="relative">
            <input
              type="text"
              value={mobileSearchTerm}
              onChange={(e) => setMobileSearchTerm(e.target.value)}
              placeholder="Glamorous cowboy boots aesthetic posters"
              className="w-full py-2 pl-4 pr-10 rounded-md bg-gray-100 text-sm border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit">
              <Search className="absolute top-2.5 right-3 h-5 w-5 text-gray-600" />
            </button>
          </div>
        </form>

        <div className="hidden md:block mt-2.5">
          <ul className="max-w-6xl mx-auto flex justify-between px-4 py-3">
            {allNavItems
              .filter((item) => !item.showInTopRight)
              .map((item, index) => {
                const isActive =
                  currentPath === item.href ||
                  (currentPath === "/" && item.href === "./") ||
                  (!allNavItems.some((nav) => nav.href === currentPath) &&
                    item.href === "./");
                return (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`flex items-center space-x-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-yellow-300 text-white rounded px-3 py-2 -mt-2"
                          : "text-gray-700 hover:text-blue-700"
                      }`}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </nav>

      <div className="h-[125px]" />

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          <div className="relative w-72 bg-white shadow-lg z-50 h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                {!user ? (
                  <>
                    <p className="text-sm">Hi there!</p>
                    <p className="font-bold">
                      <a href="/sign-in">Log In</a> or{" "}
                      <a href="/sign-up">Sign Up</a>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm">Hello,</p>
                    <p className="font-bold">
                      {user.role === "admin" ? (
                        <a href="/dashboard/user">Dashboard</a>
                      ) : (
                        user.username
                      )}
                    </p>
                  </>
                )}
              </div>
              <button onClick={() => setIsDrawerOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <ul className="divide-y">
              {allNavItems
                .filter(
                  (item) =>
                    (item.showInDrawer || !("showInDrawer" in item)) &&
                    !["Login", "Signup", "Favourites", "Cart"].includes(
                      item.label
                    )
                )
                .map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div className="flex items-center space-x-2">
                        {item.icon && <span>{item.icon}</span>}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight size={20} />
                    </a>
                  </li>
                ))}
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 font-semibold text-red-600"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
