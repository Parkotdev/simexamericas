import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { GeneralSliceType } from "@/common/types";


const initialState: GeneralSliceType = {
  loading: false
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoading } = generalSlice.actions;

export default generalSlice.reducer;
