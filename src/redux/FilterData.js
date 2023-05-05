import { createSlice } from "@reduxjs/toolkit";

const filterDataSlice = createSlice({
  name: "filterData",
  initialState: {
    filterData: {},
  },
  reducers: {
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
});

export const { setFilterData } = filterDataSlice.actions;
export default filterDataSlice.reducer;
