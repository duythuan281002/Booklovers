import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const fetchAllUser = createAsyncThunk(
  "user/fetchAllUser",
  async ({ page = 1, limit = 5 }, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users?page=${page}&limit=${limit}`
      );
      return {
        users: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy danh sách người dùng"
      );
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "user/loginAdmin",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/loginadmin",
        credentials
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Đăng nhập admin thất bại"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/loginuser",
        credentials
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

export const createNewUser = createAsyncThunk(
  "user/createUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Tạo tài khoản thất bại"
      );
    }
  }
);

export const getUserWithAddress = createAsyncThunk(
  "user/getUserWithAddress",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token không tồn tại");

      const response = await axios.get(
        "http://localhost:8080/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // { user, addresses }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Lỗi khi lấy thông tin người dùng"
      );
    }
  }
);

const initialState = {
  users: {
    list: [],
    pagination: null,
    error: null,
    isLoading: false,
  },
  createUser: {
    isLoading: false,
    error: null,
    success: false,
  },
  auth: {
    isLoading: false,
    isLoggedIn: false,
    error: null,
    userInfo: null,
  },
  adminAuth: {
    isLoading: false,
    isLoggedIn: false,
    error: null,
    userInfo: null,
  },
  profile: {
    user: null,
    addresses: [],
    isLoading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateUserStatus: (state) => {
      state.createUser = {
        isLoading: false,
        error: null,
        success: false,
      };
    },
    resetLoginUserState: (state) => {
      state.auth = {
        isLoading: false,
        isLoggedIn: false,
        error: null,
        userInfo: null,
      };
    },
    setUserInfoLoginStorage: (state, action) => {
      state.auth.userInfo = action.payload;
      state.auth.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.auth = {
        isLoading: false,
        isLoggedIn: false,
        error: null,
        userInfo: null,
      };
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // User login
      .addCase(loginUser.pending, (state) => {
        state.auth.isLoading = true;
        state.auth.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.auth.isLoading = false;
        state.auth.isLoggedIn = true;
        state.auth.userInfo = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.auth.isLoading = false;
        state.auth.error = action.payload;
      })

      // Admin login
      .addCase(loginAdmin.pending, (state) => {
        state.adminAuth.isLoading = true;
        state.adminAuth.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.adminAuth.isLoading = false;
        state.adminAuth.isLoggedIn = true;
        state.adminAuth.userInfo = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.adminAuth.isLoading = false;
        state.adminAuth.error = action.payload;
      })

      // Fetch all users
      .addCase(fetchAllUser.pending, (state) => {
        state.users.isLoading = true;
        state.users.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.users.isLoading = false;
        state.users.list = action.payload.users;
        state.users.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.users.isLoading = false;
        state.users.list = [];
        state.users.error = action.payload;
      })

      // Create new user
      .addCase(createNewUser.pending, (state) => {
        state.createUser.isLoading = true;
        state.createUser.success = false;
        state.createUser.error = null;
      })
      .addCase(createNewUser.fulfilled, (state) => {
        state.createUser.isLoading = false;
        state.createUser.success = true;
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.createUser.isLoading = false;
        state.createUser.error = action.payload;
      })

      // get user by id
      .addCase(getUserWithAddress.pending, (state) => {
        state.profile.isLoading = true;
        state.profile.error = null;
      })
      .addCase(getUserWithAddress.fulfilled, (state, action) => {
        state.profile.isLoading = false;
        state.profile.user = action.payload.user;
        state.profile.addresses = action.payload.addresses;
      })
      .addCase(getUserWithAddress.rejected, (state, action) => {
        state.profile.isLoading = false;
        state.profile.error = action.payload;
      });
  },
});

export const {
  resetCreateUserStatus,
  resetLoginUserState,
  setUserInfoLoginStorage,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
