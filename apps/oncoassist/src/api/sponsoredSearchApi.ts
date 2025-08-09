
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "@oncoassist/shared/constants";

// Define expected response type
interface SponsoredSearchItem {
  title: string;
  sub_title: string;
  content: string;
  isSponsored: number;
  sponsored_logo: string;
  type: number;
  synonyms: [];
  isHCPValidation: number
}

interface SponsoredSearchParams {
  country_object_id: string;
  profession: string;
  specialities: string[];
  jobdescription: string;
  hcpStatus: string;
  hcp_id: string;
  user_id: string;
}

// Define expected response type
interface SponsoredSearchResponse {
  status: number;
  message: string;
  data: SponsoredSearchItem[];
}



export const sponsoredSearchApi = createApi({
  reducerPath: "sponsoredSearchApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.backendAPIURL }),
  endpoints: (builder) => ({
    getSponsoredResults: builder.query<SponsoredSearchItem[], SponsoredSearchParams>({
      query: ({ country_object_id, profession, specialities, jobdescription, hcpStatus, hcp_id, user_id }) => {
        const params = new URLSearchParams();
        params.append("country_object_id", country_object_id);
        params.append("profession", profession);
        params.append("jobdescription", jobdescription);
        params.append("hcpStatus", hcpStatus);
        params.append("hcp_id", hcp_id);
        params.append("user_id", user_id);

   

        specialities.forEach((item, index) => {
          params.append(`specialities[${index}]`, item);
        });


        return `${config.sponsoredSearchEndpoint}?${params.toString()}`;
      },
      transformResponse: (response: { status: number; message: string; data: any[] }) => {
        return response.data || [];
      },
    }),
  }),
});

// Export API hook
export const { useGetSponsoredResultsQuery, useLazyGetSponsoredResultsQuery } = sponsoredSearchApi;
