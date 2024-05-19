import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

//Login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Kullanıcı verilerini al
      const user = userCredential.user;

      // Alınan kullanıcı verileri içerisinden Token seç
      const token = user.stsTokenManager.accessToken;

      // Çektiğimiz verileri fonksiyon çıktısı olarak hazırla
      const userData = {
        token,
        user: user,
      };

      console.log("user", user.email);

      // Eğer kullanıcı başarıyla login yaptıysa gelen onay Token cihazın local hafızasına kaydet

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userUid", user.uid);
      await AsyncStorage.setItem("userEmail", user.email);

      return userData;
    } catch (error) {
      console.log("erroruserslice", error);
      console.log("erroruserslice", error.message);
      console.log("erroruserslice", error.code);
      // Hata ile karşılaşılması durumunda çıktı al
      throw error;
    }
  }
);

//AutoLogin
export const autoLogin = createAsyncThunk("user/autoLogin", async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("token", token);

    if (token) {
      const auth = getAuth();
      let user = null;
      let maxTime = 5000; // 5 saniye
      const startTime = Date.now();
      while (!user && Date.now() - startTime < maxTime) {
        user = auth.currentUser;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 saniye bekle
      }
      if (!user) {
        throw new Error(
          "Kullanıcı bilgileri alınamadı. Lütfen tekrar giriş yapın."
        );
      }

      return {
        token,
        user,
      };
    } else {
      throw new Error("User not authenticated");
    }
  } catch (error) {
    throw error;
  }
});
//Logout
export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const auth = getAuth();

    // Firebase den çıkış işlemini başlat
    await signOut(auth);

    // Telefonun ön belleğinde tutulan 'token' verisini sil
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userUid");
    await AsyncStorage.removeItem("userEmail");

    await router.replace("/");

    return null;
  } catch (error) {
    throw error;
  }
});

//Register
export const register = createAsyncThunk(
  "user/register",
  async ({ email, password }) => {
    try {
      const auth = getAuth();

      // Firebase de yeni bir kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Eğer başarıyla kullanıcı oluşturulduysa token ve kullanıcı bilgileri al
      const user = userCredential.user;
      const token = user.stsTokenManager.accessToken;

      // Email onayı gönder
      await sendEmailVerification(user);

      // Kayıt sonrası kullanıcı başarıyla uygulamaya giriş yapacağı için alınan token telefonun önbelleğine kaydedilir
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userUid", user.uid);
      await AsyncStorage.setItem("userEmail", user.email);

      return token;
    } catch (error) {
      throw error;
    }
  }
);

//ForgotPassword
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email) => {
    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth, email);

      return true;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    user: null,
    isAuth: false,
    errorMessage: null,
    successMessage: null,
    errorMessageRegister: null,
    successMessageRegister: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.successMessage = "Giriş Başarılı!";
        state.errorMessage = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.token = null;
        state.errorMessage = action.error.message;
      })
      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(autoLogin.rejected, (state) => {
        state.isAuth = false;
        state.token = null;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.token = null;
        state.errorMessage = null;
        state.successMessage = "Başarıyla çıkış yaptınız!";
      })
      .addCase(register.pending, (state) => {
        isLoading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.token = action.payload;
        state.successMessageRegister =
          "Başarıyla kayıt oldunuz! Giriş yapabilirsiniz.";
        state.errorMessageRegister = null;
      })
      .addCase(register.rejected, (state) => {
        state.isAuth = false;
        state.errorMessageRegister = "Var olan bir hesapla kayıt olamazsınız!";
        state.isLoading = false;
        successMessageRegister = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.successMessage =
          "Password reset email sent. Please check your inbox";
        state.errorMessage = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.successMessage = null;
        state.errorMessage = "Failed to send password reset email!";
      });
  },
});

export default userSlice.reducer;
