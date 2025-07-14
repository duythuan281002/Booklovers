import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Gửi OTP tới email
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/forgot-password",
        { email }
      );
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Xác thực OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      // Chỉ xác thực OTP, không đổi mật khẩu
      const response = await axios.post("http://localhost:8080/verify-otp", {
        email,
        otp,
      });
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Đổi mật khẩu sau khi xác thực
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, newPassword }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/reset-password",
        {
          email,
          newPassword,
        }
      );
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  otpVerified: false,
  sendOtpStatus: {
    loading: false,
    error: null,
    message: null,
  },
  verifyOtpStatus: {
    loading: false,
    error: null,
    message: null,
  },
  resetPasswordStatus: {
    loading: false,
    error: null,
    message: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.otpVerified = false;
      state.sendOtpStatus = { loading: false, error: null, message: null };
      state.verifyOtpStatus = { loading: false, error: null, message: null };
      state.resetPasswordStatus = {
        loading: false,
        error: null,
        message: null,
      };
    },
    clearAllStatus(state) {
      state.sendOtpStatus = { loading: false, error: null, message: null };
      state.verifyOtpStatus = { loading: false, error: null, message: null };
      state.resetPasswordStatus = {
        loading: false,
        error: null,
        message: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Gửi OTP
      .addCase(sendOtp.pending, (state) => {
        state.sendOtpStatus.loading = true;
        state.sendOtpStatus.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.sendOtpStatus.loading = false;
        state.sendOtpStatus.message = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.sendOtpStatus.loading = false;
        state.sendOtpStatus.error = action.payload;
      })

      // Xác thực OTP
      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtpStatus.loading = true;
        state.verifyOtpStatus.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyOtpStatus.loading = false;
        state.verifyOtpStatus.message = action.payload;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyOtpStatus.loading = false;
        state.verifyOtpStatus.error = action.payload;
      })

      // Đổi mật khẩu
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus.loading = true;
        state.resetPasswordStatus.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus.loading = false;
        state.resetPasswordStatus.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus.loading = false;
        state.resetPasswordStatus.error = action.payload;
      });
  },
});

export const { resetAuthState, clearAllStatus } = authSlice.actions;
export default authSlice.reducer;
