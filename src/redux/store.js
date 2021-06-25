import { combineReducers, configureStore } from '@reduxjs/toolkit';
import vehiclePickerReducer from './VehiclePickerSlice';
import employeesListReducer from './EmployeesListSlice';
import serviceRequestListReducer from './ServiceRequesListSlice';
import serviceListReducer from './ServiceListSlice';

export const rootReducer = combineReducers({
    vehiclePicker: vehiclePickerReducer,
    employeesList: employeesListReducer,
    serviceRequestList: serviceRequestListReducer,
    serviceList: serviceListReducer
})

export const store = configureStore({
    reducer: {
        rootReducer
    }
})