import { createSlice } from "@reduxjs/toolkit";


export const rentingListSlice = createSlice({
    name: 'rentingList',
    initialState: {
        selectedRentingId: 0
    },
    reducers: {
        setSelectedRentingId: (state, action) => {
            state.selectedRentingId = action.payload;
        }
    }
})

export const { setSelectedRentingId } = rentingListSlice.actions;
export default rentingListSlice.reducer;
export const selectSelectedRentingId = (state) => state.rootReducer.rentingList.selectedRentingId;