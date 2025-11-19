import { createSlice } from "@reduxjs/toolkit";
import { initialValues } from "../../utils/profileValidation";

const patientFormSlice = createSlice({
  name: "patientForm",
  initialState: initialValues,
  reducers: {
    updateField: (state, action) => {      
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialValues,
  },
});

export const { updateField, resetForm } = patientFormSlice.actions;
export default patientFormSlice.reducer;
