import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "../redux/favorites/favoriteApi";
import { addToCart } from "../redux/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

type FavoriteItem = {
  _id: string;
  title: string;
  category: string;
  price: number;
  image: string[]; // assuming it's an array of image URLs
};

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    if (data?.favorites) {
      setFavorites(data.favorites);
    }
  }, [data]);

  const handleRemoveFavorite = async (id: string) => {
    try {
      await removeFavorite(id).unwrap();
      setFavorites((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  const handleAddToCart = (item: FavoriteItem) => {
    dispatch(
      addToCart({
        id: item._id,
        name: item.title,
        price: item.price,
        image: item.image?.[0],
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Favorites
        </h1>

        {isLoading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load favorites
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Start saving your favorite items to see them here
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow overflow-hidden group relative"
              >
                {/* Favorite Icon */}
                <button
                  onClick={() => handleRemoveFavorite(item._id)}
                  className="absolute top-3 right-3 z-10 p-1.5  hover:bg-red-100 text-red-600"
                  title="Remove from favorites"
                >
                  <HeartSolid className="w-5 h-5" />
                </button>

                {/* Image */}
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover object-center"
                    src={item.image?.[0]}
                    alt={item.title}
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        <Link to={`/products/${item._id}`}>{item.title}</Link>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₦{Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="mt-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-3 rounded-full flex items-center justify-center gap-2 text-md font-semibold transition
                        bg-blue-700 text-white hover:bg-blue-800"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
