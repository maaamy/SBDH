import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";

export const inscriptionClient = createAsyncThunk(
  "auth/inscriptionClient",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await authService.inscriptionClient(formData);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const connexionClient = createAsyncThunk(
  "auth/connexionClient",
  async ({ email, mdp }, { rejectWithValue }) => {
    try {
      const data = await authService.connexionClient({ email, mdp });
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const inscriptionEntreprise = createAsyncThunk(
  "auth/inscriptionEntreprise",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await authService.inscriptionEntreprise(formData);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const connexionEntreprise = createAsyncThunk(
  "auth/connexionEntreprise",
  async ({ email, siret, mdp }, { rejectWithValue }) => {
    try {
      const data = await authService.connexionEntreprise({ email, siret, mdp });
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const connexionClientGoogle = createAsyncThunk(
  "auth/connexionClientGoogle",
  async ({ token }, { rejectWithValue }) => {
    try {
      const data = await authService.connexionClientGoogle({ token });
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
    
  }
);

export const connexionEntrepriseGoogle = createAsyncThunk(
  "auth/connexionEntrepriseGoogle",
  async ({ token, siret }, { rejectWithValue }) => {
    try {
      const data = await authService.connexionEntrepriseGoogle({ token, siret });
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
    
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(inscriptionClient.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(inscriptionClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { user_id: payload.user_id, email: payload.email};
        state.token = payload.token;
      })
      .addCase(inscriptionClient.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(connexionClient.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(connexionClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { user_id: payload.user_id, email: payload.email};
        state.token = payload.token;
      })
      .addCase(connexionClient.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(inscriptionEntreprise.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(inscriptionEntreprise.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(inscriptionEntreprise.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(connexionEntreprise.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(connexionEntreprise.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { user_id: payload.user_id, email: payload.email};
        state.token = payload.token;
      })
      .addCase(connexionEntreprise.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(connexionClientGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connexionClientGoogle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { user_id: payload.user_id, email: payload.email};
        state.token = payload.token;
      })
      .addCase(connexionClientGoogle.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(connexionEntrepriseGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connexionEntrepriseGoogle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { user_id: payload.user_id, email: payload.email};
        state.token = payload.token;
      })
      .addCase(connexionEntrepriseGoogle.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;