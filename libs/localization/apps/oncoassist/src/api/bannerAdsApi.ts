import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from "@oncoassist/shared/constants";

interface BannerParams {
    country_object_id: string;
    banner_location: number;    
    profession:string;
    jobdescription:string;
    hcp_validation:string;
    include_weblink : number;
    hcp_id:string;
    specialities: string[];
}

export const bannerAdsApi = createApi({
  reducerPath: 'bannerAdsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.backendAPIURL,
    paramsSerializer: (params) => {
      const query = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          params[key].forEach((item: any) => {
            query.append(`${key}[]`, item);  // <-- Use key[] for array elements
          });
        } else {
          query.append(key, String(params[key]));
        }
      });
      return query.toString();
    },
  }),
  endpoints: (builder) => ({
    getBannerAds: builder.query<any, BannerParams>({
      query: ({ country_object_id, banner_location, profession, jobdescription, hcp_validation, include_weblink, hcp_id, specialities }) => ({
        url: config.specialityBannerEndPoint,
        params: { country_object_id, banner_location, profession, jobdescription, hcp_validation, include_weblink, hcp_id, specialities },
      }),
    }),
  }),
});

export const { useGetBannerAdsQuery } = bannerAdsApi;