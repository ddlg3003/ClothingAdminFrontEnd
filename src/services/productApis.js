import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => 'product/getAll',
        }),
        getProducts: builder.query({
            query: ({ pageNumber, pageSize, cat }) =>
                `product?pageNo=${pageNumber}&pageSize=${pageSize}&cat=${cat}`,
        }),
        getProduct: builder.query({
            query: (id) => `product/${id}`,
        }),
        getTypes: builder.query({
            query: () => 'admin/type/getAll',
        }),
        getProductTypes: builder.query({
            query: (productId) => `type/product/${productId}`,
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetAllProductsQuery,
    useGetProductsQuery,
    useGetProductQuery,
    useGetTypesQuery,
    useGetProductTypesQuery,
} = product;