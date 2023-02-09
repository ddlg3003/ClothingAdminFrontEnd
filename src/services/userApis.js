import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => 'admin/users/getAllUser',
      providesTags: ['User'],
    }),
    banUserByEmail: builder.mutation({
      query: (email) => ({
        url: `admin/users/ban?email=${email}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
    unbanUserByEmail: builder.mutation({
      query: (email) => ({
        url: `admin/users/unban?email=${email}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useBanUserByEmailMutation,
  useUnbanUserByEmailMutation,
} = product;
