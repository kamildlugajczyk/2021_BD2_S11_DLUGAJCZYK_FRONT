import { createSlice } from '@reduxjs/toolkit';

export const vehiclePickerSlice = createSlice({
    name: 'vehiclePicker',
    initialState: {
        selectedId: 0
    },
    reducers: {
        setSelected: (state, action) => {
            state.selectedId = action.payload;
        }
    }
})

export const { setSelected } = vehiclePickerSlice.actions;
export default vehiclePickerSlice.reducer;
export const selectSelectedId = (state) => state.vehiclePicker.selectedId;