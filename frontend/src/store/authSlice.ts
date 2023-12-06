// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api/axios";
import Cookies from "js-cookie";

interface User {
  email: string;
  user_id: number;
}

interface AuthState {
  status: "idle" | "pending" | "loading" | "succeeded" | "failed";
  httpErr: string | null;
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isTokenValid: boolean;
}

const initialState: AuthState = {
  status: "idle",
  httpErr: null,
  isAuthenticated: Cookies.get("app-token") ? true : false,
  user: JSON.parse(sessionStorage.getItem("user") as string) || null,
  token: Cookies.get("app-token") || null,
  isTokenValid: false,
};

export const regiesterAsync = createAsyncThunk(
  "auth/regiester",
  async (
    {
      email,
      firstName,
      lastName,
      password,
    }: { email: string; firstName: string; lastName: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("auth/register", {
        email,
        firstName,
        lastName,
        password,
      });
      if (
        response &&
        response.data &&
        response.data.status &&
        response.data.status === 400
      ) {
        return thunkAPI.rejectWithValue(response.data.messageEn);
      }
      const data = await response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("auth/login", {
        email,
        password,
      });

      const results = response.data;

      return { user: results.data.user, token: results.data.accessToken };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isTokenValid = false;
      state.status = "idle";
      Cookies.remove("app-token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isTokenValid = true;
          Cookies.set("app-token", state.token);
          sessionStorage.setItem("user_id", String(state.user.user_id));
          sessionStorage.setItem("user", JSON.stringify(state.user));
          console.log(action.payload.user);
        }
      )
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.isTokenValid = false; // Set to false when token is not found or there's an error
      })
      .addCase(regiesterAsync.pending, (state) => {
        state.status = "loading";
        state.httpErr = null;
      })
      .addCase(regiesterAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.httpErr = null;
      })
      .addCase(regiesterAsync.rejected, (state, action) => {
        state.status = "failed";
        state.httpErr = action.payload as string;
      });
  },
});

export const { logout, resetState } = authSlice.actions;
export default authSlice.reducer;
