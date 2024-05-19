import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddAudit = () => {
  const [auditName, setAuditName] = useState("");
  const [auditSector, setAuditSector] = useState("");

  const handlePress = async () => {
    try {
      const userUid = await AsyncStorage.getItem("userUid");
      const userEmail = await AsyncStorage.getItem("userEmail");
      const docRef = await addDoc(collection(db, "usersAudits"), {
        userUid: userUid,
        userEmail: userEmail,
        auditName: auditName,
        auditSector: auditSector,
      });
      // Kaydetme başarılı olduğunda alert göster
      Alert.alert(
        "Kaydetme Başarılı!",
        "Denetim başarılı bir şekilde kaydedildi",
        [
          {
            text: "Başka Denetim Ekle",
            onPress: () => {
              setAuditName("");
              setAuditSector("");
            },
          },
          {
            text: "Ana Sayfaya Dön",
            onPress: () => {
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      // Hata durumunda alert göster
      alert("Kaydetme işlemi sırasında bir hata oluştu.");
      console.error("Hata:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Sektör Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={auditSector}
          onChangeText={setAuditSector}
        />
        <TextInput
          style={styles.input}
          placeholder="Denetim Adı Griniz.."
          placeholderTextColor="#7EBDC2"
          value={auditName}
          onChangeText={setAuditName}
        />
      </View>
      <View>
        {/* Soru ekleme alanı Başlangıcı */}
        {/* <View style={styles.questionsContainer}>
        <TextInput style={styles.questionsInput} placeholder="Soru 1" />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Soru Ekle</Text>
          </TouchableOpacity>
        </View>
      </View> */}
        {/* Soru ekleme alanı Sonu */}
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handlePress}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddAudit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#EFE6DD",
  },
  inputContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    gap: 10,
  },
  questionsContainer: {},
  buttonContainer: {
    paddingBottom: 10,
    alignItems: "center",
  },
  button: {
    width: "90%",
    backgroundColor: "#F3DFA2",
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 24,
    alignSelf: "center",

    color: "#000",
  },
  saveButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  saveButton: {
    width: "90%",
    backgroundColor: "#7EBDC2",
    padding: 5,
    borderRadius: 15,
  },
  saveButtonText: {
    alignSelf: "center",
    fontSize: 24,
    color: "#fff",
  },
  input: {
    height: 70,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#7EBDC2",
  },
  questionsInput: {
    height: 70,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#F3DFA2",
  },
});
