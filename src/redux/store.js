import { combineReducers, configureStore } from '@reduxjs/toolkit';
import vehiclePickerReducer from './VehiclePickerSlice';
import employeesListReducer from './EmployeesListSlice';
import serviceRequestListReducer from './ServiceRequesListSlice';

export const rootReducer = combineReducers({
    vehiclePicker: vehiclePickerReducer,
    employeesList: employeesListReducer,
    serviceRequestList: serviceRequestListReducer
})

export const store = configureStore({
    reducer: {
        rootReducer
    }
})