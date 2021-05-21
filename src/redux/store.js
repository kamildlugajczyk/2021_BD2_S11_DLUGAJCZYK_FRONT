import { configureStore } from '@reduxjs/toolkit';
import vehiclePickerReducer from './VehiclePickerSlice';

export const store = configureStore({
    reducer: {
        vehiclePicker: vehiclePickerReducer
    }
})