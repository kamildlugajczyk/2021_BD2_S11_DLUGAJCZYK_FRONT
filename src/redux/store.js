import { combineReducers, configureStore } from '@reduxjs/toolkit';
import vehiclePickerReducer from './VehiclePickerSlice';
import employeesListReducer from './EmployeesListSlice';

export const rootReducer = combineReducers({
    vehiclePicker: vehiclePickerReducer,
    employeeList: employeesListReducer
})

export const store = configureStore({
    reducer: {
        rootReducer
    }
})