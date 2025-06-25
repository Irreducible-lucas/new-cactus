import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../util/baseURL';

interface Product {
  _id: string;
  title: string;
  price: string;
  size: { label: string };
  features: string[];
  image: string[];
  rating: number;
  productType: string;
  productTag: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateProduct extends Omit<Product, '_id' | 'createdAt' | 'updatedAt'> {}

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/product`,
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query<Product[], void>({
      query: () => '',
      providesTags: ['Products'],
    }),

    fetchProductById: builder.query<Product, string>({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    fetchRelatedProducts: builder.query<Product[], string>({
      query: (id) => `related/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id: `RELATED-${id}` }],
    }),

    fetchRandomProducts: builder.query<Product[], number | void>({
      query: (limit = 5) => `random?limit=${limit}`,
      providesTags: ['Products'],
    }),

    // ✅ Fixed endpoint to match backend route: /type/:productType
    fetchProductsByType: builder.query<Product[], string>({
      query: (type) => `type/${type}`,
      providesTags: ['Products'],
    }),

    searchProducts: builder.query<Product[], string>({
  query: (searchQuery) => `search?q=${encodeURIComponent(searchQuery)}`,
  providesTags: ['Products'],
}),


    // Assumes you're sending a FormData object
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: 'create-product',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation<Product, { id: string; updateData: FormData }>({
      query: ({ id, updateData }) => ({
        url: `update/${id}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),

    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useFetchRelatedProductsQuery,
  useFetchRandomProductsQuery,
  useFetchProductsByTypeQuery,
  useCreateProductMutation,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;

export default productsApi;
