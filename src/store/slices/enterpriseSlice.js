import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as enterpriseService from "../../services/enterpriseService";
import { logout } from "./authSlice";

export const fetchEnterprise = createAsyncThunk(
    "enterprise/fetchEnterprise",
    async (id, { rejectWithValue }) => {
        try {
            const data = await enterpriseService.fetchEnterprise(id);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);

export const updateEnterpriseProfile = createAsyncThunk(
    "enterprise/updateEnterpriseProfile",
    async(form, { rejectWithValue }) => {
        try {
            const data = await enterpriseService.updateEnterpriseProfile(form);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);

export const addProduct = createAsyncThunk(
    "enterprise/addProduct",
    async({ form, variants=null, picture=null} , { rejectWithValue }) => {
        try {
            const data = await enterpriseService.addProduct(form, variants, picture);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);

const enterpriseSlice = createSlice({
    name:"enterprise",
    initialState: {
        profile : null,
        products: null,
        isLoading : true,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.profile = null;
            })
            .addCase(fetchEnterprise.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.profile = {id: payload.id, loginId: payload.login_id, nom: payload.nom, siret: payload.siret, email: payload.email, telephone: payload.telephone, adresse: payload.adresse, adresse2: payload.adresse2, ville: payload.ville, codePostal: payload.code_postal, pays: payload.pays, statut: payload.status};
            })
            .addCase(fetchEnterprise.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(fetchEnterprise.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateEnterpriseProfile.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.profile = {id: payload.id, loginId: payload.login_id, nom: payload.nom, siret: payload.siret, email: payload.email, telephone: payload.telephone, adresse: payload.adresse, adresse2: payload.adresse2, ville: payload.ville, codePostal: payload.code_postal, pays: payload.pays, statut: payload.status};
            })
            .addCase(updateEnterpriseProfile.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(updateEnterpriseProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.products = payload;
            })
            .addCase(addProduct.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
    }
});

export const selectEnterprise = (state) => state.enterprise;

export default enterpriseSlice.reducer;