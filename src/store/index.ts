import accountReducer from './accountSlice';
import widgetsReducer from './widgetsSlice';
import widgetSettingsReducer from './widgetSettingsSlice';
import widgetPositionsReducer from './widgetPositionsSlice';
import serviceAuthReducer from './serviceAuthSlice';
import weatherReducer from './weatherSlice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  account: accountReducer,
  widgets: widgetsReducer,
  widgetSettings: widgetSettingsReducer,
  widgetPositions: widgetPositionsReducer,
  serviceAuth: serviceAuthReducer,
  weather: weatherReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
