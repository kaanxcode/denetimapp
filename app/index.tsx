import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, login, register } from "@/redux/features/userSlice";

const Login = () => {
  const isFirstRun = useRef(true);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleErrorMessage, setHandleErrorMessage] = useState("");

  const { user, errorMessage, successMessage, isAuth, isLoading } = useSelector(
    (state) => state.user
  );
  console.log(isAuth);
  const handlePress = async () => {
    try {
      const resultAction = await dispatch(login({ email, password }));

      // register action creator'ından dönen bilgileri kontrol et
      if (resultAction.payload) {
      } else {
      }
    } catch (error) {
      console.error("login işlemi sırasında hata oluştu:", error);
    }
  };

  useEffect(() => {
    const fetchAutoLogin = async () => {
      try {
        await dispatch(autoLogin());
      } catch (error) {
        console.error("Auto login error:", error);
      }
    };

    fetchAutoLogin();
  }, []);

  useEffect(() => {
    if (isAuth === true) {
      router.replace("(drawer)/");
    }
  }, [isAuth]);

  useEffect(() => {
    if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
      setHandleErrorMessage(
        "Şifre veya E-Posta Hatalı! Kayıtlı Değilseniz Kayıt Olunuz."
      );
    } else if (errorMessage === null) {
      setHandleErrorMessage("");
    }
  }, [errorMessage, successMessage]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/react-logo.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-Posta Adresinizi Giriniz"
          placeholderTextColor="#7EBDC2"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifrenizi Giriniz"
          placeholderTextColor="#7EBDC2"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        {handleErrorMessage ? (
          <Text style={{ color: "red" }}>{handleErrorMessage}</Text>
        ) : (
          <Text style={{ color: "green" }}>{successMessage}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.text}>Hesabın Yok Mu? Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFE6DD",
  },
  imageContainer: {
    flex: 2,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  inputContainer: {
    flex: 2,
    justifyContent: "flex-end",
    marginBottom: 20,
    width: "100%",
    gap: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#7EBDC2",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
  buttonContainer: {
    flex: 3,
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    alignSelf: "center",
    color: "#7EBDC2",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#7EBDC2",
    padding: 10,
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
});
