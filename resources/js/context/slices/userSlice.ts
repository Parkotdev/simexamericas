import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserSliceType, UserType } from "@/common/types";

const initialState: UserSliceType = {
  data: {
    role: {
      id: "",
      name_es: "",
      name_en: "",
      name_fr: "",
      name_pt: "",
      created_at: null,
      updated_at: null,
    },
    country: {
      id: "",
      iso_code: "",
      iso_code_3: "",
      phone_code: "",
      name: "",
      timezone: "",
      gmt: "",
      created_at: null,
      updated_at: null,
    },
    simulation: null,
    area: null,
    group: null,
    subgroup: null,
    name: "",
    last_name: "",
    email: "",
    password: "",
    status: false,
    photo: null,
    phone: null,
    organization: null
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.data = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
