import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const AddAudit = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Sektör Giriniz..."
          placeholderTextColor="#7EBDC2"
        />
        <TextInput
          style={styles.input}
          placeholder="Denetim Adı Griniz.."
          placeholderTextColor="#7EBDC2"
        />
      </View>
      {/* Soru ekleme alanı Başlangıcı */}
      <View style={styles.questionsContainer}>
        <TextInput style={styles.questionsInput} placeholder="Soru 1" />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Soru Ekle</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Soru ekleme alanı Sonu */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton}>
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
