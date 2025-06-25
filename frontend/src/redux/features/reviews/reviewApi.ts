import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../util/baseURL';

interface ReviewData {
  productId: string;
  comment: string;
  rating: number;
  userId: string;
}

interface ReviewCountResponse {
  totalReviews: number;
}

interface Review {
  id: string;
  userId: string;
  comment: string;
  rating: number;
}

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: 'include',
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    postReview: builder.mutation<void, ReviewData>({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: productId },
      ],
    }),

    getReviewsCount: builder.query<ReviewCountResponse, void>({
      query: () => ({
        url: "/total-reviews",
      }),
    }),

    getReviewsByUserId: builder.query<Review[], string>({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result, error, arg) =>
        result ? [{ type: "Reviews", id: arg }] : [],
    }),

    getReviewsByProductId: builder.query<Review[], string>({
      query: (productId) => ({
        url: `/product/${productId}`,
      }),
      providesTags: (result, error, productId) =>
        result ? [{ type: "Reviews", id: productId }] : [],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsCountQuery,
  useGetReviewsByUserIdQuery,
  useGetReviewsByProductIdQuery,
} = reviewApi;

export default reviewApi;
