import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from "@oncoassist/shared/constants";



export const upvoteApi = createApi({
  reducerPath: 'upvoteApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.backendAPIURL}),
  endpoints: (builder) => ({
    saveUpvote: builder.mutation({
      query: (upvoteData) => ({
        url: config.newsVoteEndpoint,
        method: 'POST',
        body: upvoteData,
      }),
    }),
  }),
});

export const { useSaveUpvoteMutation } = upvoteApi;


