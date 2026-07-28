import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as customerMLService from "../../services/customerMLService";

export const fetchDashboard = createAsyncThunk(
    "customerDashboard/fetchDashboard",
    async (clientId, { rejectWithValue }) => {
        try {
            return await customerMLService.fetchDashboard(clientId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchRecommendations = createAsyncThunk(
    "customerDashboard/fetchRecommendations",
    async (clientId, { rejectWithValue }) => {
        try {
            return await customerMLService.fetchRecommendations(clientId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchTrending = createAsyncThunk(
    "customerDashboard/fetchTrending",
    async (limit = 10, { rejectWithValue }) => {
        try {
            return await customerMLService.fetchTrending(limit);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchHistory = createAsyncThunk(
    "customerDashboard/fetchHistory",
    async (clientId, { rejectWithValue }) => {
        try {
            return await customerMLService.fetchHistory(clientId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const customerDashboardSlice = createSlice({
    name: "customerDashboard",
    initialState: {
        dashboard: null,
        recommendations: [],
        trending: [],
        history: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRecommendations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendations = action.payload;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTrending.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrending.fulfilled, (state, action) => {
                state.loading = false;
                state.trending = action.payload;
            })
            .addCase(fetchTrending.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const selectCustomerDashboard = (state) => state.customerDashboard;

export default customerDashboardSlice.reducer;