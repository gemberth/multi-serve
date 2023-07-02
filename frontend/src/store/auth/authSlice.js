import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'logeado', 'no logeado'
        user: {},
        errorMsg: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMsg = undefined;
        },

        onLogin: (state, {payload}) => {
            state.status = 'logeado';
            state.user = payload;
            state.errorMsg = undefined;
        },

        onLogout : (state, {payload}) => {
            state.status = 'no-logeado';
            state.user = {};
            state.errorMsg = payload;
        },

        clearErrorMessage: (state)=> {
            state.errorMsg = undefined
        }
    }
});
// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;