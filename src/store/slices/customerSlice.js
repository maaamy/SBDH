import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as customerService from "../../services/customerService";
import { logout } from "./authSlice";

export const fetchCustomer = createAsyncThunk(
    "customer/fetchCustomer",
    async (id, { rejectWithValue }) => {
        try {
            const data = await customerService.fetchCustomer(id);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);

export const updateCustomerProfile = createAsyncThunk(
    "customer/updateCustomerProfile",
    async(form, { rejectWithValue }) => {
        try {
            const data = await customerService.updateCustomerProfile(form);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
)

const customerSlice = createSlice({
    name:"customer",
    initialState: {
        profil : null,
        cartCount: 0,
        notifCount: 0,
        isLoading : true,
        error: null
    },
    reducers: {
        setCartCount: (state, { payload }) => {
            state.cartCount = payload;
        },
        setNotifCount: (state, { payload }) => {
            state.notifCount = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.profil = null;
                state.cartCount = 0;
                state.notifCount = 0;
            })
            .addCase(fetchCustomer.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.profil = {
                    id: payload.login_id,
                    clientId: payload.id,
                    nom: payload.nom,
                    prenom: payload.prenom,
                    email: payload.email,
                    dateNaissance: payload.date_naissance,
                    telephone: payload.telephone,
                    adresse: payload.adresse,
                    adresse2: payload.adresse2,
                    ville: payload.ville,
                    codePostal: payload.code_postal,
                    pays: payload.pays
                };
            })
            .addCase(fetchCustomer.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(fetchCustomer.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateCustomerProfile.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.profil = {
                    id: payload.login_id,
                    clientId: payload.id,
                    nom: payload.nom,
                    prenom: payload.prenom,
                    email: payload.email,
                    dateNaissance: payload.date_naissance,
                    telephone: payload.telephone,
                    adresse: payload.adresse,
                    adresse2: payload.adresse2,
                    ville: payload.ville,
                    codePostal: payload.code_postal,
                    pays: payload.pays
                };
            })
            .addCase(updateCustomerProfile.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(updateCustomerProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });

    }
});

export const { setCartCount, setNotifCount } = customerSlice.actions;
export const selectCustomer = (state) => state.customer;

export default customerSlice.reducer;