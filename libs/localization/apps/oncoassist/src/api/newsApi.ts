import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from "@oncoassist/shared/constants";

interface NewsParams {
    page: number; 
    user_object_id?: string;   
}

type NewsType = {
  title: string;
  description: string;
  imageUrl: string;
  channel: string;
  link: string;
  published: string;
  voteCount: number;
  userId: string;
  id: number;
  type: number;
  votedOrNot: number;
}

type NewsResponse = {
  data: NewsType[];
  total: number;
  totalPages: number;
};

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.backendAPIURL }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    // GET - Fetch news with pagination
    getNews: builder.query<NewsResponse, NewsParams>({
      query: ({ page, user_object_id }) => ({
        url: config.newsApiEndpoint,
        method: 'POST',
        body: { page, per_page: config.newsPerPage, user_object_id },
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (response: { data: NewsType[]; total: number; totalPages: number }) => ({
        data: response.data,
        total: response.data.total, 
        totalPages: Math.ceil(response.data.total / config.newsPerPage), 
      }),
      providesTags: (result) =>
        result?.data.data
          ? [...result.data.data.map(({ id }) => ({ type: 'News', id })), { type: 'News', id: 'LIST' }]
          : [{ type: 'News', id: 'LIST' }],
    }),
   

    voteNews: builder.mutation<{ status: number; newsId: number; newVoteCount: number }, { news_id: number; user_object_id: string; type: number }>({
      query: ({ news_id, user_object_id, type }) => ({
        url: config.newsVoteEndpoint,
        method: 'POST',
        body: { news_id, user_object_id, type },
        headers: { 'Content-Type': 'application/json' },
      }),
      async onQueryStarted({ news_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if ([0, 1].includes(data.status)) {
            // dispatch(newsApi.util.invalidateTags([
            //   { type: 'News', id: news_id }, 
            //   { type: 'News', id: 'LIST' },   
            // ]));
          }
        } catch (error) {
          console.error("Vote API failed", error);
        }
      },
    }),


  }),
});

// Hooks
export const {
  useGetNewsQuery,
  useVoteNewsMutation,
} = newsApi;
