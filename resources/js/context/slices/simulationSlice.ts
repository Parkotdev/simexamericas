import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { SimulationSliceType, SimulationType } from "@/common/types";

const initialState: SimulationSliceType = {
  data: {
    id: "",
    country: {
      id: "",
      iso_code: "",
      iso_code_3: "",
      phone_code: "",
      name: "",
      timezone: "",
      gmt: "",
      created_at: null,
      updated_at: null
    },
    incident: {
      id: "",
      event: {
        id: "",
        incidents: [],
        event_es: "",
        event_en: "",
        event_fr: "",
        event_pt: "",
        created_at: null,
        updated_at: null
      },
      incident_es: "",
      incident_en: "",
      incident_fr: "",
      incident_pt: "",
      created_at: null,
      updated_at: null
    },
    incidents: [],
    status: {
      id: "",
      status_es: "",
      status_en: "",
      status_fr: "",
      status_pt: "",
      created_at: null,
      updated_at: null
    },
    name: "",
    description: "",
    logo: null,
    icon: null,
    date_start_real: "",
    date_end_real: "",
    date_start_sim: "",
    date_end_sim: "",
    pause: false,
    created_at: null,
    updated_at: null
  }
};

export const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    setSimulation: (state, action: PayloadAction<SimulationType>) => {
      state.data = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setSimulation } = simulationSlice.actions;

export default simulationSlice.reducer;
