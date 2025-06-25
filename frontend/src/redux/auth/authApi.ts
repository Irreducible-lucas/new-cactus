import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../util/baseURL';

interface User {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  [key: string]: any;
}

interface NewUser {
  username: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UpdateUserRolePayload {
  userId: string;
  role: 'admin' | 'user';
}

interface ProfileData {
  username?: string;
  phone?: string;
  bio?: string;
  profession?: string;
  profileImage?: File | string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<{ success: boolean; message: string }, NewUser>({
      query: (newUser) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
    }),

    loginUser: builder.mutation<{ success: boolean; user: User; token?: string }, LoginCredentials>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    googleLoginUser: builder.mutation<
      { success: boolean; user: User; token?: string },
      { username: string; email: string; phone?: string; photoURL?: string }
    >({
      query: (googleUser) => ({
        url: '/google-login',
        method: 'POST',
        body: googleUser,
      }),
    }),

    logoutUser: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    getUsers: builder.query<User[], void>({
      query: () => ({ url: '/users', method: 'GET' }),
      providesTags: ['User'],
    }),

    deleteUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    updateUserRole: builder.mutation<{ success: boolean; message: string }, UpdateUserRolePayload>({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: ['User'],
    }),

    editProfile: builder.mutation<{ success: boolean; user: User }, ProfileData>({
      query: (profileData) => ({
        url: '/edit-profile',
        method: 'PATCH',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<{ success: boolean; message: string }, ChangePasswordPayload>({
      query: (payload) => ({
        url: '/change-password',
        method: 'PATCH',
        body: payload,
      }),
    }),

    forgotPassword: builder.mutation<{ success: boolean; message: string }, { email: string }>({
      query: (data) => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      { success: boolean; message: string },
      { token: string; password: string }
    >({
      query: ({ token, password }) => ({
        url: `/reset-password/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGoogleLoginUserMutation, // ✅ newly added
  useLogoutUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

export default authApi;
