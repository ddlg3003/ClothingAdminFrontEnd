import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => 'admin/users/getAllUser',
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetAllUsersQuery,
} = product;