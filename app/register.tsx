import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@/redux/features/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [handleErrorMessage, setHandleErrorMessage] = useState("");

  const { user, errorMessageRegister, successMessageRegister } = useSelector(
    (state) => state.user
  );

  const handlePress = async () => {
    try {
      const resultAction = await dispatch(register({ email, password }));

      // register action creator'ından dönen bilgileri kontrol et
      if (resultAction.payload) {
      } else {
      }
    } catch (error) {
      console.error("Register işlemi sırasında hata oluştu:", error);
    }
  };

  useEffect(() => {
    const handleConfirmPassword = () => {
      if (password !== confirmPassword) {
        setIsButtonDisable(true);
        setHandleErrorMessage("Eşleşmiyor!");
      } else {
        setIsButtonDisable(false);
        setHandleErrorMessage("");
      }
    };

    handleConfirmPassword();
  }, [email, password, confirmPassword]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/drawer-logo.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-Posta "
          placeholderTextColor="#7EBDC2"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#7EBDC2"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre Tekrar"
          placeholderTextColor="#7EBDC2"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
        />
        {errorMessageRegister ? (
          <Text style={{ color: "red" }}>{errorMessageRegister}</Text>
        ) : (
          <Text style={{ color: "green" }}>{successMessageRegister}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={isButtonDisable}
          style={isButtonDisable ? styles.buttonDisable : styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => router.back()}
        >
          <Text style={styles.text}>Zaten hesabın var mı? Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
  buttonDisable: {
    backgroundColor: "#ccc",
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
