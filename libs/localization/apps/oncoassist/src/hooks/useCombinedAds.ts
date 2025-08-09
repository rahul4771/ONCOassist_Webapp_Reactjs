import { useGetBannerAdsQuery } from '../api/bannerAdsApi';
import { useGetProgrammaticAdsMutation } from '../api/programmaticAdsApi';
import { useEffect, useState } from 'react';



interface CombinedAdsParams {
  country_object_id: string;
  banner_location: number;
  profession: string;
  jobdescription: string;
  hcp_validation: string;
  include_weblink: number;
  hcp_id: string;
  specialities: string[] | string;  // <-- allow both array and string coming in
}

type GroupedAds = Record<number, any[]>;

export const useCombinedAds = (params: CombinedAdsParams) => {

  // --- Normalize specialities here ---
  const normalizedSpecialities = Array.isArray(params.specialities)
  ? params.specialities
  : params.specialities
  ? params.specialities.split(',').map((item) => item.trim())
  : [];



  const bannerParams = { ...params, specialities: normalizedSpecialities };
  const [programmaticAdsFn] = useGetProgrammaticAdsMutation();
  const { data: bannerAdsData, isSuccess: bannerSuccess } = useGetBannerAdsQuery(bannerParams, {
    skip: !bannerParams.country_object_id,
  });
  const [groupedAds, setGroupedAds] = useState<GroupedAds>({});
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched || !bannerSuccess || !bannerAdsData) return;

      try {
        const programmaticRes = await programmaticAdsFn({
          ...params,
          specialities: normalizedSpecialities,
          doc_os: 3,
          version: 2,
        }).unwrap();

        const programmaticAds = programmaticRes?.data?.filter((item: any) => item.ad_location_id === params.banner_location) ?? [];

        const bannerAds = (bannerAdsData?.data ?? []).map((ad: any) => ({
          ...ad,
          type: 'banner',
        }));

        let programmaticMapped = [];
        if(params.banner_location === 0){
          programmaticMapped = programmaticAds.flatMap((ad: any) => [
            ...(ad.ad_inline ?? []).map((inlineAd: any) => ({
              ...inlineAd,
              type: 'programmatic',
            })),
          ]);
        } else {
          programmaticMapped = programmaticAds.flatMap((ad: any) => [
            ...(ad.ad_normal ? [{ ...ad.ad_normal, type: 'programmatic' }] : []),
            ...(ad.ad_inline ?? []).map((inlineAd: any) => ({
              ...inlineAd,
              type: 'programmatic',
            })),
          ]);
        }
        

        const allAds = [...bannerAds, ...programmaticMapped];

        // Group ads by inline_banner_index
        const grouped: GroupedAds = allAds.reduce((acc: GroupedAds, ad: any) => {
          const index = Number(ad.inline_banner_index) || 0;
          if (!acc[index]) {
            acc[index] = [];
          }
          acc[index].push(ad);
          return acc;
        }, {});

        // Sort each group: put 'banner' type first
        Object.keys(grouped).forEach((key) => {
          grouped[Number(key)] = grouped[Number(key)].sort((a, b) => {
            if (a.type === 'banner' && b.type !== 'banner') return -1;
            if (a.type !== 'banner' && b.type === 'banner') return 1;
            return 0;
          });
        });

        setGroupedAds(grouped);
        setHasFetched(true);
      } catch (err) {
        console.error('Error fetching programmatic ads:', err);
      }
    };

    fetchData();
  }, [bannerSuccess, bannerAdsData, hasFetched]);

  return groupedAds;
};
