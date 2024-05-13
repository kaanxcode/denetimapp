import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");

  const onChangeText = (inputText) => {
    setEmail(inputText);
  };

  const handlePress = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/react-logo.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>E-posta</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={onChangeText}
          value={email}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
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
  text: {
    fontSize: 16,
    alignSelf: "center",
    color: "#7EBDC2",
    marginBottom: 10,
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
