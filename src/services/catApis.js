import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'category/getAll',
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetCategoriesQuery,
} = product;