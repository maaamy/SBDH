import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as enterpriseMLService from "../../services/enterpriseMLService";
import { fetchForecasts } from "../../services/mlService";

export const fetchEnterpriseDashboard = createAsyncThunk(
    "enterpriseDashboard/fetchDashboard",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchDashboard(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchEnterpriseProducts = createAsyncThunk(
    "enterpriseDashboard/fetchProducts",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchProducts(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchEnterpriseInventory = createAsyncThunk(
    "enterpriseDashboard/fetchInventory",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchInventory(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchEnterpriseCustomers = createAsyncThunk(
    "enterpriseDashboard/fetchCustomers",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchCustomers(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchEnterpriseReviews = createAsyncThunk(
    "enterpriseDashboard/fetchReviews",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchReviews(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchEnterpriseFinance = createAsyncThunk(
    "enterpriseDashboard/fetchFinance",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchFinance(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchTopProducts = createAsyncThunk(
    "enterpriseDashboard/fetchTopProducts",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchTopProducts(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchOrdersStatus = createAsyncThunk(
    "enterpriseDashboard/fetchOrdersStatus",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchOrdersStatus(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchDailySales = createAsyncThunk(
    "enterpriseDashboard/fetchDailySales",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchDailySales(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchSalesProducts = createAsyncThunk(
    "enterpriseDashboard/fetchSalesProducts",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            return await enterpriseMLService.fetchSalesProducts(enterpriseId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchEnterpriseForecasts = createAsyncThunk(
    "enterpriseDashboard/fetchPredictions",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            const data = await fetchForecasts(enterpriseId);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const enterpriseDashboardSlice = createSlice({
    name: "enterpriseDashboard",
    initialState: {
        dashboard: null,
        products: [],
        inventory: [],
        customers: [],
        reviews: [],
        finance: [],
        topProducts: [],
        ordersStatus: [],
        dailySales: [],
        salesProducts: [],
        forecasts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEnterpriseDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEnterpriseDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload;
            })
            .addCase(fetchEnterpriseDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchEnterpriseProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEnterpriseProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchEnterpriseProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchEnterpriseInventory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEnterpriseInventory.fulfilled, (state, action) => {
                state.loading = false;
                state.inventory = action.payload;
            })
            .addCase(fetchEnterpriseInventory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchEnterpriseCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEnterpriseCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchEnterpriseCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchEnterpriseReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEnterpriseReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchEnterpriseReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchEnterpriseFinance.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEnterpriseFinance.fulfilled, (state, action) => {
                state.loading = false;
                state.finance = action.payload;
            })
            .addCase(fetchEnterpriseFinance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchTopProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTopProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.topProducts = action.payload;
            })
            .addCase(fetchTopProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrdersStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrdersStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.ordersStatus = action.payload;
            })
            .addCase(fetchOrdersStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchDailySales.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDailySales.fulfilled, (state, action) => {
                state.loading = false;
                state.dailySales = action.payload;
            })
            .addCase(fetchDailySales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSalesProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSalesProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.salesProducts = action.payload;
            })
            .addCase(fetchSalesProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchEnterpriseForecasts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEnterpriseForecasts.fulfilled, (state, action) => {
                state.loading = false;
                state.forecasts = action.payload;
            })
            .addCase(fetchEnterpriseForecasts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectEnterpriseDashboard = (state) => state.enterpriseDashboard;

export default enterpriseDashboardSlice.reducer;