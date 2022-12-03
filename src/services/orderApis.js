import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => 'admin/orders/getAll',
        }),
        getOrders: builder.query({
            query: ({ pageNumber, pageSize }) =>
                `admin/order?pageNo=${pageNumber}&pageSize=${pageSize}`,
            providesTags: ['Order'],
        }),
        acceptOrder: builder.mutation({
            query: (orderId) => ({
                url: `admin/order/accept/${orderId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Order'],
        }),
        denyOrder: builder.mutation({
            query: (orderId) => ({
                url: `admin/order/deny/${orderId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetAllOrdersQuery,
    useGetOrdersQuery,
    useAcceptOrderMutation,
    useDenyOrderMutation
} = product;