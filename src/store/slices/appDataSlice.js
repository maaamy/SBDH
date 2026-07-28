
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as appDataService from "../../services/appDataService";

export const fetchAppData = createAsyncThunk(
  "appData/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const [categories, attributes, brands] = await Promise.all([
        appDataService.fetchCategories(),
        appDataService.fetchAttributes(),
        appDataService.fetchBrands(),
      ]);
      return { categories, attributes, brands };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
    name:"appData",
    initialState: {
        categories: [],
        attributes: [],
        brands: [],
        isLoading : true,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppData.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
                state.attributes = action.payload.attributes;
                state.brands = action.payload.brands;
                state.loading = false;
            })
            .addCase(fetchAppData.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchAppData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
    }
});

export default categorySlice.reducer;