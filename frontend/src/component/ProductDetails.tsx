import { useParams } from "react-router-dom";
import { ShoppingCart, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../redux/features/product/productApi";
import { addToCart } from "../redux/cart/cartSlice";
import DeliveryInfo from "./DeliveryInfo";

// ❤️ Heroicons
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

// 🔁 Favorite API
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} from "../redux/favorites/favoriteApi";
import type { RootState } from "../redux/store";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  // ⛳ Get logged-in user
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;

  const { data: product, isLoading, error } = useFetchProductByIdQuery(id!); // ✅ ensure non-null

  const [mainImage, setMainImage] = useState("");

  // 🔁 Favorite state and actions
  const { data: favoriteData, isLoading: favLoading } =
    useGetFavoritesQuery(userId); // ✅ passed userId here

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [favoriteSet, setFavoriteSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (Array.isArray(favoriteData?.favorites)) {
      const ids = favoriteData.favorites.map(
        (fav: { _id?: string; productId?: string }) => fav._id ?? fav.productId
      );
      setFavoriteSet(new Set(ids));
    }
  }, [favoriteData]);

  const isFavorite = product && favoriteSet.has(product._id);

  const handleToggleFavorite = async () => {
    if (!product) return;

    const updatedSet = new Set(favoriteSet);
    try {
      if (isFavorite) {
        updatedSet.delete(product._id);
        setFavoriteSet(updatedSet);
        await removeFavorite(product._id).unwrap();
      } else {
        updatedSet.add(product._id);
        setFavoriteSet(updatedSet);
        await addFavorite(product._id).unwrap();
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
      setFavoriteSet(new Set(favoriteSet)); // revert UI
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        category: (product as any).category, // ✅ or update Product type
        price: Number(product.price), // ✅ ensure number type
        image: product.image?.[0],
        quantity: 1,
      })
    );
  };

  if (isLoading || favLoading) {
    return <div className="text-center mt-10 text-lg">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Product not found.</p>
      </div>
    );
  }

  const images = product.image || [];
  const features = product.features || [];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 lg:gap-x-10 bg-white min-h-screen mt-10">
      {/* Main Image and Thumbnails Wrapper */}
      <div className="flex flex-col-reverse md:flex-row gap-4 gap-x-7 items-center md:items-start">
        {/* Thumbnails */}
        <div className="flex flex-row-reverse flex-wrap md:flex-col gap-4 justify-center md:justify-start">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`thumbnail-${index}`}
              onClick={() => setMainImage(src)}
              className="w-16 h-16 object-cover rounded-lg border hover:border-black cursor-pointer"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={mainImage || images[0]}
            alt="main"
            className="max-w-full md:max-w-2xl rounded-xl shadow"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {product.title}
        </h1>

        <p className="text-3xl font-bold text-gray-900 mt-5">
          ₦{product.price}
        </p>

        <div className="my-8">
          <p className="font-semibold">Size</p>
          <p className="text-gray-600 text-sm">{product.size?.label}</p>
        </div>

        {/* Add to Cart Button & Phone Icon */}
        <div className="space-y-3">
          <div className="flex space-x-3">
            <button
              onClick={handleAddToCart}
              className="bg-blue-700 hover:bg-blue-800 text-white w-full py-3 rounded-full flex items-center justify-center gap-2 text-lg font-semibold transition"
            >
              <ShoppingCart size={20} /> Add to cart
            </button>
            <a href="tel:+2348065137683">
              <button
                className="p-3 border border-blue-700 rounded-xl  text-blue-700"
                aria-label="Phone"
              >
                <Phone size={20} />
              </button>
            </a>
          </div>

          {/* Add to Favourite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`w-full py-3 rounded-full flex items-center justify-center gap-2 text-md font-semibold transition ${
              isFavorite
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isFavorite ? (
              <HeartSolid className="w-5 h-5" />
            ) : (
              <HeartOutline className="w-5 h-5" />
            )}
            {isFavorite ? "Remove from favourites" : "Add to favourites"}
          </button>
        </div>

        <DeliveryInfo />

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < product.rating ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} out of 5
          </span>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-2">
            Product features
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
