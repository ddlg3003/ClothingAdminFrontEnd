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
            providesTags: ['Product'],
        }),
        getTypes: builder.query({
            query: () => 'admin/type/getAll',
            providesTags: ['Type'],
        }),
        getProductTypes: builder.query({
            query: (productId) => `type/product/${productId}`,
            providesTags: ['Type'],
        }),
        createProduct: builder.mutation({
            query: (formData) => ({
                url: 'admin/product/create',
                method: 'POST',
                body: formData,
            }),
        }),
        createTypes: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `admin/type/create/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            // invalidatesTags: ['Product'],       
        }),
        createProductImage: builder.mutation({
            query: ({ id, files }) => {
                return {
                    url: `admin/product/${id}/imageDetail`,
                    method: 'POST',
                    body: files,
                }
            },
            invalidatesTags: ['Product'],
        }),
        getImagesList: builder.query({
            query: (id) => `product/${id}/imageDetail`,
        }),
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `admin/product/${id}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        updateTypes: builder.mutation({
            query: ({ productId, formData }) => ({
                url: `admin/type/${productId}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Product', 'Type'],
        })
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
    useGetImagesListQuery,
    useUpdateProductMutation,
    useUpdateTypesMutation,
} = product;