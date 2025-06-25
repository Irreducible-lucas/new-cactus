import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../util/baseURL";

const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: "include",
  }),
  tagTypes: ["Favorites", "Products"],
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => "/favorites",
    }),
    addFavorite: builder.mutation({
      query: (productId) => ({
        url: `/favorites/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Favorites", "Products"],
    }),
    removeFavorite: builder.mutation({
      query: (productId) => ({
        url: `/favorites/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites", "Products"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;

export default favoriteApi;
