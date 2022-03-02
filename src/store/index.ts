import accountReducer from './accountSlice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({account: accountReducer});

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
