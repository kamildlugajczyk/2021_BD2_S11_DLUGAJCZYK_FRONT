import { createSlice } from '@reduxjs/toolkit';

export const vehiclePickerSlice = createSlice({
    name: 'vehiclePicker',
    initialState: {
        selectedVehicleId: 0
    },
    reducers: {
        setSelected: (state, action) => {
            state.selectedVehicleId = action.payload;
        }
    }
})

export const { setSelected } = vehiclePickerSlice.actions;
export default vehiclePickerSlice.reducer;
export const selectSelectedId = (state) => state.vehiclePicker.selectedVehicleId;