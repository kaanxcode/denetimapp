import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setInfos, saveAndSend } from "../redux/features/auditSlice";
import { router } from "expo-router";
import { pdfGenerator } from "@/PdfGenerator/pdfGenerator";

const FormComponent = () => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState(getFormattedDate());
  const [generalNotes, setGeneralNotes] = useState("");
  const [emailRecipients, setEmailRecipients] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const dispatch = useDispatch();

  const { infos } = useSelector((state) => state.audit);

  //console.log("infos => FormComponent.tsx", infos);

  // Tarih ve saat fonksiyonu
  function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}.${minutes}`;
    return formattedDate;
  }

  const handlePressSend = async () => {
    try {
      await dispatch(saveAndSend());
      const file = await pdfGenerator();
      console.log("file", file);
      Alert.alert(
        "İŞLEM BAŞARILI!", // Alert başlığı
        "Denetim başarı ile Gönderildi", // Alert mesajı
        [
          {
            text: "Ana Sayfaya Dön", // Buton metni
            onPress: () => router.back(),
          },
          {
            text: "Geçmiş Denetimler", // Buton metni
            onPress: () => router.replace("History"), // 'LoginScreen' yerine giriş yap ekranınızın rotasını yazın
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error sending data:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  useEffect(() => {
    const handlePress = () => {
      const newInfo = {
        companyName: companyName,
        location: location,
        inspector: inspector,
        inspectionDate: inspectionDate,
        generalNotes: generalNotes,
        emailRecipients: emailRecipients,
      };
      dispatch(setInfos(newInfo));
    };
    handlePress();
  }, [
    companyName,
    location,
    inspector,
    inspectionDate,
    generalNotes,
    emailRecipients,
  ]);

  // form kontol alanı
  const isFormFilled = () => {
    return (
      companyName !== "" &&
      location !== "" &&
      inspector !== "" &&
      inspectionDate !== "" &&
      emailRecipients !== ""
    );
  };
  const handleInputChange = () => {
    const isFormFilledCompletely = isFormFilled();
    setIsButtonEnabled(isFormFilledCompletely);
  };
  useEffect(() => {
    handleInputChange();
  }, [
    companyName,
    location,
    inspector,
    inspectionDate,
    emailRecipients,
    generalNotes,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="*Firma Adı Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <TextInput
          style={styles.input}
          placeholder="*Lokasyon \ Bölge Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="*Denetleyen Kişi Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={inspector}
          onChangeText={setInspector}
        />
        <TextInput
          style={styles.input}
          placeholder="*Denetleme Tarihi Giriniz... (GG/AA/YYYY SS:DD)"
          placeholderTextColor="#7EBDC2"
          value={inspectionDate}
          onChangeText={setInspectionDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Genel Notları Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={generalNotes}
          onChangeText={setGeneralNotes}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          inputMode="email"
          autoCapitalize="none"
          placeholder="*E-Posta Alıcılarını Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={emailRecipients}
          onChangeText={setEmailRecipients}
        />
        <Text style={styles.textRequiredFiled}>* Zorunlu Alanlar</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={!isButtonEnabled}
          style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
          onPress={handlePressSend}
        >
          <Text style={styles.buttonText}>Kaydet Ve Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#EFE6DD",
  },
  inputContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    gap: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#7EBDC2",
    borderRadius: 4,
    backgroundColor: "#F5F5F5",
  },
  button: {
    padding: 15,
    backgroundColor: "#7EBDC2",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  textRequiredFiled: {
    color: "red",
    fontSize: 12,
  },
});
