import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => 'admin/orders/getAll',
        }),
        
    }),
    overrideExisting: false,
});

export const { 
    useGetAllOrdersQuery,
} = product;