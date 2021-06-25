import { createSlice } from '@reduxjs/toolkit';

export const vehiclePickerSlice = createSlice({
    name: 'vehiclePicker',
    initialState: {
        selectedVehicleId: 0
    },
    reducers: {
        setSelectedVehicleId: (state, action) => {
            state.selectedVehicleId = action.payload;
        }
    }
})

export const { setSelectedVehicleId } = vehiclePickerSlice.actions;
export default vehiclePickerSlice.reducer;
export const selectSelectedVehicleId = (state) => state.rootReducer.vehiclePicker.selectedVehicleId;