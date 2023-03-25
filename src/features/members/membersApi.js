import { apiSlice } from '../api/apiSlice';

export const membersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => '/team',
    }),
  }),
});

export const { useGetMembersQuery } = membersApi;
