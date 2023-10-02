import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalCreateTaskOpen: false,
  modalLoginOpen: true,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
       openModalCreateTask(state) {
      state.modalCreateTaskOpen = true;
    },
    closeModalCreateTask(state) {
      state.modalCreateTaskOpen = false;
    },
    closeModalLogin(state){
        state.modalLoginOpen = false;
      
    },
    
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
