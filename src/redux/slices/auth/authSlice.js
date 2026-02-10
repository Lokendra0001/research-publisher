import { createSlice } from '@reduxjs/toolkit';
import { login, fetchUser, registerUser, logout } from './authSliceThungs';

const initialState = {
    user: null,
    role: null,
    isAuthenticated: false,
    loading: true,
    initialLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, role } = action.payload;
            state.user = user;
            state.role = role;
            state.isAuthenticated = true;
        },
        logOut: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload?.user;
                state.role = action.payload?.role;
                state.isAuthenticated = true;
                state.loading = false;
                state.initialLoading = false;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user = null;
                state.role = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.initialLoading = false;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload?.user;
                state.role = action.payload?.role;
                state.isAuthenticated = true;
                state.loading = false;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                if (action.payload?.isReviewer) {
                    state.loading = false;
                    return;
                }
                state.user = action.payload?.user;
                state.role = action.payload?.role;
                state.isAuthenticated = true;
                state.loading = false;
            })

            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.role = null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
            })

    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

