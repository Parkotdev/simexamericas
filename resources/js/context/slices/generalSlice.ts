import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { GeneralSliceType } from "@/common/types";

const initialState: GeneralSliceType = {
  loading: false,
  socket: null
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoading, setSocket } = generalSlice.actions;

export default generalSlice.reducer;
