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

export const fetchProductsEnterprise = createAsyncThunk(
    "enterprise/fetchProducts",
    async( enterpriseId, { rejectWithValue }) => {
         try {
            const data = await enterpriseService.fetchProductsEnterprise(enterpriseId);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);

export const deleteVariantProduct = createAsyncThunk(
    "enterprise/deleteVariantProduct",
    async( {enterpriseId, variantId}, { rejectWithValue }) => {
         try {
            await enterpriseService.deleteVariantProduct(variantId);
            const data =  await enterpriseService.fetchProductsEnterprise(enterpriseId);
            return data;
    
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);

export const updateVariantProduct = createAsyncThunk(
    "enterprise/updateVariantProduct",
    async (variant, { rejectWithValue }) => {
        try {
            const data = await enterpriseService.updateVariantProduct(variant);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);

export const fetchProductsWithAvis = createAsyncThunk(
    "enterprise/fetchProductsWithAvis",
    async (enterpriseId, { rejectWithValue }) => {
        try {
            const data = await enterpriseService.fetchProductsWithAvis(enterpriseId);
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
        products: [],
        productsWithAvis: [],
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
            })
            .addCase(fetchProductsEnterprise.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.products = payload.products;
            })
            .addCase(fetchProductsEnterprise.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(fetchProductsEnterprise.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteVariantProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.products = payload.products;
            })
            .addCase(deleteVariantProduct.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(deleteVariantProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateVariantProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.products = state.products.map((p) => ({
                    ...p,
                    Variante_produit: p.Variante_produit.map((v) =>
                        v.id === payload.id ? { ...v, prix: payload.prix, stock: payload.stock, est_active: payload.est_active } : v
                    ),
                }));
            })
            .addCase(updateVariantProduct.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(updateVariantProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductsWithAvis.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.productsWithAvis = payload;
            })
            .addCase(fetchProductsWithAvis.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(fetchProductsWithAvis.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
    }
});

export const selectEnterprise = (state) => state.enterprise;

export default enterpriseSlice.reducer;