import { createSlice } from '@reduxjs/toolkit';

const planSlice = createSlice({
  name: 'plan',
  initialState: {
    value: 'monthly',
    growthPlan: [],
    freePlan: [],
    proPlan: [],
    basicPlan: [],
    freeFeatures: [],
    basicFeatures: [],
    proFeatures: [],
    growthFeatures: [],

  },
  reducers: {
    setYearlyPlan: (state) => {
      state.value = 'yearly';
    },
    setMonthlyPlan: (state) => {
      state.value = 'monthly';
    },
    addAllGrowthPlan: (state, action) => {
      state.growthPlan = action.payload; // Store the array for Growth Plan
    },
    addAllFreePlan: (state, action) => {
      state.freePlan = action.payload; // Store the array for Free Plan
    },
    addAllProPlan: (state, action) => {
      state.proPlan = action.payload; // Store the array for Pro Plan
    },
    addAllBasicPlan: (state, action) => {
      state.basicPlan = action.payload; // Store the array for Basic Plan
    },
    addGrowthFeatures: (state, action) => {
      state.growthFeatures = action.payload; // Store the array for Growth Features
    },
    addFreeFeatures: (state, action) => {
      state.freeFeatures = action.payload; // Store the array for Free Features
    },
    addProFeatures: (state, action) => {
      state.proFeatures = action.payload; // Store the array for Pro Features
    },
    addBasicFeatures: (state, action) => {
      state.basicFeatures = action.payload; // Store the array for Basic Features
    },
  },
});

export const {
  setYearlyPlan,
  setMonthlyPlan,
  addAllGrowthPlan,
  addAllFreePlan,
  addAllProPlan,
  addAllBasicPlan,
  addFreeFeatures,
  addBasicFeatures,
  addProFeatures,
  addGrowthFeatures,
} = planSlice.actions;
export default planSlice.reducer;

