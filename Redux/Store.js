import { configureStore } from '@reduxjs/toolkit';
import planReducer from './actions/planAction';

const store = configureStore({
  reducer: {
    plan: planReducer,
  },
});

export default store;
