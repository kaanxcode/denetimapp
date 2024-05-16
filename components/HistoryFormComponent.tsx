import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const HistoryFormComponent = ({ infos }) => {
  //console.log("infos => HistoryFormComponent.tsx", infos);
  const [companyName, setCompanyName] = useState(infos.companyName);
  const [location, setLocation] = useState(infos.location);
  const [inspector, setInspector] = useState(infos.inspector);
  const [inspectionDate, setInspectionDate] = useState(infos.inspectionDate);
  const [generalNotes, setGeneralNotes] = useState(infos.generalNotes);
  const [emailRecipients, setEmailRecipients] = useState(infos.emailRecipients);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Firma Adı Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={companyName}
        />
        <TextInput
          style={styles.input}
          placeholder="Lokasyon \ Bölge Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={location}
        />
        <TextInput
          style={styles.input}
          placeholder="Denetleyen Kişi Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={inspector}
        />
        <TextInput
          style={styles.input}
          placeholder="Denetleme Tarihi Giriniz... (GG/AA/YYYY SS:DD)"
          placeholderTextColor="#7EBDC2"
          value={inspectionDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Genel Notları Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={generalNotes}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          inputMode="email"
          autoCapitalize="none"
          placeholder="E-Posta Alıcılarını Giriniz..."
          placeholderTextColor="#7EBDC2"
          value={emailRecipients}
        />
      </View>
    </View>
  );
};

export default HistoryFormComponent;

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
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#7EBDC2",
    borderRadius: 4,
    backgroundColor: "#F5F5F5",
  },
  button: {
    padding: 10,
    backgroundColor: "#7EBDC2",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
