import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from '../api/newsApi';
import { upvoteApi } from '../api/upvoteApi';
import { bannerAdsApi } from '../api/bannerAdsApi';
import { programmaticAdsApi } from '../api/programmaticAdsApi';
import { sponsoredSearchApi } from '../api/sponsoredSearchApi';

import leftMenuReducer from "./leftMenuReducer";
import userEmailReducer from "./userEmailSlice"; 
import { sharedStore } from "@oncoassist/store"; 
import voteReducer from "./voteSlice";
import getUserValidate from "./getValidatedUserSlice";
import sponsoredSearch from "./sponsoredSearchSlice";
import rightMenuReducer from "./rightMenuReducer";

export const store = configureStore({
  reducer: {
    ...sharedStore,
    leftMenu: leftMenuReducer, 
    rightMenu: rightMenuReducer,
    userEmail: userEmailReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [upvoteApi.reducerPath]: upvoteApi.reducer,
    [bannerAdsApi.reducerPath]: bannerAdsApi.reducer,
    [programmaticAdsApi.reducerPath]: programmaticAdsApi.reducer,
    [sponsoredSearchApi.reducerPath]: sponsoredSearchApi.reducer,
    vote: voteReducer,
    hcpValidation : getUserValidate,
    sponsoredData : sponsoredSearch,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(newsApi.middleware)
      .concat(upvoteApi.middleware)
      .concat(bannerAdsApi.middleware)
      .concat(programmaticAdsApi.middleware)
      .concat(sponsoredSearchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
