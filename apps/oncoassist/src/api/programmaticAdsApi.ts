import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from "@oncoassist/shared/constants";

interface ProgrammaticParams {
    country_object_id: string;
    banner_location: number;    
    profession:string;
    jobdescription:string;
    hcp_validation:string;
    include_weblink : number;
    hcp_id:string;
    specialities: string[];
    doc_os: number;
    version: number;
}


  export const programmaticAdsApi = createApi({
    reducerPath: 'programmaticAdsApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.backendAPIURL }),
    endpoints: (builder) => ({
      getProgrammaticAds: builder.mutation<any, ProgrammaticParams>({
        query: (body) => ({
          url: config.programmaticAdEndPoint,
          method: 'POST',
          body,
        }),
      }),
    }),
  });

  export const {
    useGetProgrammaticAdsMutation,
  } = programmaticAdsApi;