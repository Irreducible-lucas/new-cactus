import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/auth/authSlice"; // make sure this path is correct
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

import {
  AdminDashboard,
  Cart,
  CheckOut,
  ErrorPage,
  ExploreDesign,
  Favourite,
  ForgetPassword,
  Frame,
  Furniture,
  Home,
  HomeDecor,
  Login,
  Order,
  Painting,
  ProductDetailPage,
  ResetPassword,
  SearchResultPage,
  SignUp,
  UserProfile,
} from "./pages";

import Root from "./layout/Root";

// Routes setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="explores" element={<ExploreDesign />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="frame" element={<Frame />} />
        <Route path="painting" element={<Painting />} />
        <Route path="home-decor" element={<HomeDecor />} />
        <Route path="furniture" element={<Furniture />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Favourite />} />
        <Route path="/product-details/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="dashboard/user" element={<AdminDashboard />} />
      </Route>

      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Only set user if Redux doesn't have it
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser(parsedUser));
        } catch (err) {
          console.error("Failed to parse user from localStorage:", err);
        }
      }
    }
  }, [dispatch, user]);

  return <RouterProvider router={router} />;
};

export default App;
