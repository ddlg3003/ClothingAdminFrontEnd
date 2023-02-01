import { clothing } from "./clothingBaseApis";

const product = clothing.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "category/getAll",
      providesTags: ["Category"],
    }),
    getPagingCategories: builder.query({
      query: ({ pageNumber, pageSize }) =>
        `category?pageNo=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "admin/category/createCategory",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (catId) => ({
        url: `admin/category/${catId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getCategoryById: builder.query({
      query: (catId) => `category/${catId}`,
    }),
    updateCategory: builder.mutation({
      query: ({ catId, formData }) => ({
        url: `admin/category/${catId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetPagingCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = product;
