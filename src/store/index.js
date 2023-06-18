import { configureStore } from '@reduxjs/toolkit';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import reducer from '../reducers';

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingBarMiddleware())
});
export default store;