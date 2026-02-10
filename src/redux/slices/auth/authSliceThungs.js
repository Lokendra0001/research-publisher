import { constant } from "@/utils/constant";
import { notify } from "@/utils/toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
    'fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${constant.SERVER_URL}auth/me`, {
                withCredentials: true
            });

            if (res.data.success) {
                return {
                    user: res.data?.user,
                    role: res.data?.role
                };
            }

            return rejectWithValue('Failed to fetch user');
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const login = createAsyncThunk(
    'login',
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${constant.SERVER_URL}auth/login`, {
                email: payload.email,
                password: payload.password,
            }, {
                withCredentials: true
            });

            if (res.data.success) {
                notify.success("Welcome back!");
                return {
                    user: res.data?.user,
                    role: res.data?.user?.role
                };
            }

            return rejectWithValue('Failed to login');
        } catch (error) {
            notify.error(error.response?.data?.message || "Invalid credentials. Please try again.");
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'registerUser',
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${constant.SERVER_URL}auth/register`, payload, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status === 201 || res.status === 200) {
                if (res.data.role == "reviewer" || res.data.role == "editor") {
                    notify.success(res.data.msg || "Registration successful! Please wait for approval.");
                    return {
                        isReviewer: true,
                        message: res.data.msg
                    };
                } else {
                    notify.success("Account created successfully!");
                    return {
                        user: res.data?.user,
                        role: res.data?.user?.role
                    };
                }
            }

            return rejectWithValue('Failed to register');
        } catch (error) {
            notify.error(error.response?.data?.message || "Registration failed. Please try again.");
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const logout = createAsyncThunk(
    'logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${constant.SERVER_URL}auth/logout`, {
                withCredentials: true
            });

            if (res.data.success) {
                notify.success(res.data.message || "Logout Successfully!");
                return true;
            }

            return rejectWithValue('Failed to logout');
        } catch (error) {
            notify.error(error.response?.data?.message || "Logout failed");
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

