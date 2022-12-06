import { clothing } from './clothingBaseApis';

const product = clothing.injectEndpoints({
    endpoints: (builder) => ({
        getProfitByCriteria: builder.query({
            query: (criteria) => `admin/statistic/${criteria}`,
        }),
        getChartStatistic: builder.query({
            query: () => `admin/statistic/chart`,
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProfitByCriteriaQuery,
    useGetChartStatisticQuery
} = product;