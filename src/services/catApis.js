import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'category/getAll',
            providesTags: ['Category'],
        }),
        createCategory: builder.mutation({
            query: (formData) => ({
                url: 'admin/category/createCategory',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetCategoriesQuery,
    useCreateCategoryMutation,
} = product;