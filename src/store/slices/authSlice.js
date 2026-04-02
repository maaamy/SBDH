import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";


export const verifyToken = createAsyncThunk('auth/verifyToken', 
  async (_, { rejectWithValue }) => {
   try {
      const data = await authService.verifyToken();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
});


export const inscriptionClient = createAsyncThunk(
  "auth/inscriptionClient",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await authService.inscriptionClient(formData);
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
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
    
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => { 
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(verifyToken.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { user_id: payload.user.user_id, email: payload.user.email, type: payload.user.type};
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(inscriptionClient.pending, (state) => { 
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(inscriptionClient.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { user_id: payload.user_id, email: payload.email, type: payload.type};
        state.isAuthenticated = true;
      })
      .addCase(inscriptionClient.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(connexionClient.pending, (state) => { 
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(connexionClient.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { user_id: payload.user_id, email: payload.email, type: payload.type};
        state.isAuthenticated = true;
      })
      .addCase(connexionClient.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(inscriptionEntreprise.pending, (state) => { 
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(inscriptionEntreprise.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { user_id: payload.user_id, email: payload.email, type: payload.type};
        state.isAuthenticated = true;
      })
      .addCase(inscriptionEntreprise.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(connexionEntreprise.pending, (state) => { 
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(connexionEntreprise.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { user_id: payload.user_id, email: payload.email, type: payload.type};
        state.isAuthenticated = true;
      })
      .addCase(connexionEntreprise.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(connexionClientGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(connexionClientGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { user_id: payload.user_id, email: payload.email, type: payload.type};
        state.isAuthenticated = true;
      })
      .addCase(connexionClientGoogle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(connexionEntrepriseGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(connexionEntrepriseGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = { user_id: payload.user_id, email: payload.email, type: payload.type};
        state.isAuthenticated = true;
      })
      .addCase(connexionEntrepriseGoogle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;

      });
  }
});

export default authSlice.reducer;