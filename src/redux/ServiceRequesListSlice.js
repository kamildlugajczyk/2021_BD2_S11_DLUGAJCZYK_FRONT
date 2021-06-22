import { createSlice } from "@reduxjs/toolkit";

export const serviceRequestListSlice = createSlice({
    name: 'serviceRequestList',
    initialState: {
        selectedServiceRequestId: 0
    },
    reducers: {
        setSelectedServiceRequestId: (state, action) => {
            state.selectedServiceRequestId = action.payload;
        }
    }
})

export const { setSelectedServiceRequestId } = serviceRequestListSlice.actions;
export default serviceRequestListSlice.reducer;
export const selectSelectedServiceRequestId = (state) => state.rootReducer.serviceRequestList.selectedServiceRequestId;