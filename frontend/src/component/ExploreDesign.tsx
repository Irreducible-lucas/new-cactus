import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";

import { useFetchAllProductsQuery } from "../redux/features/product/productApi";

import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "../redux/favorites/favoriteApi";

import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import "keen-slider/keen-slider.min.css";

import type { RootState } from "../redux/store";

interface Product {
  _id: string;
  title: string;
  images?: string[];
  image?: string[];
}

const ExploreDesign = () => {
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useFetchAllProductsQuery();

  const { data: favoriteData, isSuccess: favSuccess } = useGetFavoritesQuery(
    undefined,
    {
      skip: false, // fetch if user exists
    }
  );

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = favoriteData?.favorites ?? [];
  const [favoriteSet, setFavoriteSet] = useState<Set<string>>(new Set());

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 5,
          spacing: 16,
        },
      },
    },
  });

  useEffect(() => {
    if (Array.isArray(favorites)) {
      const ids = favorites.map(
        (fav: { _id?: string; productId?: string }) => fav._id ?? fav.productId
      );
      setFavoriteSet(new Set(ids));
    }
  }, [favorites]);

  const handleToggle = async (productId: string) => {
    const isFavorite = favoriteSet.has(productId);
    const updatedSet = new Set(favoriteSet);

    if (isFavorite) {
      updatedSet.delete(productId);
      setFavoriteSet(updatedSet);
    } else {
      updatedSet.add(productId);
      setFavoriteSet(updatedSet);
    }

    try {
      if (isFavorite) {
        await removeFavorite(productId).unwrap();
      } else {
        await addFavorite(productId).unwrap();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setFavoriteSet(new Set(favoriteSet)); // revert to original state
    }
  };

  if (productsLoading) return <p>Loading products...</p>;
  if (productsError) return <p>Failed to load products.</p>;

  const latestProducts: Product[] = products.slice(0, 5);

  return (
    <section className="px-8 py-10 bg-white mt-14">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize">
          Explore new products
        </h2>
        <a
          href="/explores"
          className="text-pink-500 font-semibold hover:underline text-sm"
        >
          See more
        </a>
      </header>

      <div ref={sliderRef} className="keen-slider">
        {latestProducts.map((product) => (
          <div key={product._id} className="keen-slider__slide">
            <div className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
              <Link to={`/product-details/${product._id}`}>
                <div className="relative">
                  <img
                    src={
                      product.images?.[0] ||
                      product.image?.[0] ||
                      "/default.jpg"
                    }
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />

                  {user && (
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation
                        handleToggle(product._id);
                      }}
                      className="absolute top-2 right-2 p-1.5"
                    >
                      {favoriteSet.has(product._id) ? (
                        <HeartSolid className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartOutline className="w-6 h-6 text-gray-700" />
                      )}
                    </button>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {product.title}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreDesign;
