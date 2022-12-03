import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => 'product/getAll',
        }),
        getProducts: builder.query({
            query: ({ pageNumber, pageSize, cat }) =>
                `product?pageNo=${pageNumber}&pageSize=${pageSize}&cat=${cat}`,
            providesTags: ['Product'],
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
        createProduct: builder.mutation({
            query: (formData) => ({
                url: 'admin/product/create',
                method: 'POST',
                body: formData,
            }),
        }),
        createTypes: builder.mutation({
            query: (formData) => {
                return {
                    url: 'admin/type/create',
                    method: 'POST',
                    body: formData,
                }
            },
            // invalidatesTags: ['Product'],       
        }),
        createProductImage: builder.mutation({
            query: ({ formData, files }) => {
                const { id } = formData;

                return {
                    url: `product/${id}/imageDetail`,
                    method: 'POST',
                    body: files,
                }
            },
            invalidatesTags: ['Product'],
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
    useCreateProductMutation,
    useCreateTypesMutation,
    useCreateProductImageMutation,
} = product;