import { createSlice } from "@reduxjs/toolkit";



export const serviceListSlice = createSlice({
    name: "serviceList",
    initialState: {
        selectedServiceId: 0
    },
    reducers: {
        setSelectedServiceId: (state, action) => {
            state.selectedServiceId = action.payload;
        }
    }
})

export const { setSelectedServiceId } = serviceListSlice.actions;
export default serviceListSlice.reducer;
export const selectSelectedServiceId = (state) => state.rootReducer.serviceList.selectedServiceId;