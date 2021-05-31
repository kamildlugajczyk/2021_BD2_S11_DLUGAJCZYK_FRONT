import { createSlice } from '@reduxjs/toolkit';

export const employeesListSlice = createSlice({
    name: 'employeesList',
    initialState: {
        selectedEmployeeId: 0
    },
    reducers: {
        setSelected: (state, action) => {
            state.selectedEmployeeId = action.payload;
        }
    }
})

export const { setSelected } = employeesListSlice.actions;
export default employeesListSlice.reducer;
export const selectSelectedEmployeeId = (state) => state.rootReducer.employeesList.selectedEmployeeId;