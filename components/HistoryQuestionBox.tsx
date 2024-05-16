import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";

const HistoryQuestionBox = ({ question, answer, note }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question}</Text>
      </View>

      {/* Cevaplar */}
      <View style={styles.answerContainer}>
        <Pressable
          style={[
            styles.answerButton,
            answer === "Uygun" && { backgroundColor: "green" },
          ]}
        >
          <Text style={styles.answerButtonText}>Uygun</Text>
        </Pressable>
        <Pressable
          style={[
            styles.answerButton,
            answer === "Uygun Değil" && { backgroundColor: "red" },
          ]}
        >
          <Text style={styles.answerButtonText}>Uygun Değil</Text>
        </Pressable>
        <Pressable
          style={[
            styles.answerButton,
            answer === "Uygulama Yok" && { backgroundColor: "grey" },
          ]}
        >
          <Text style={styles.answerButtonText}>Uygulama Yok</Text>
        </Pressable>
      </View>
      {/* Cevaplar */}
      <View style={styles.additionalContainer}>
        <Pressable
          style={styles.additionalButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.additionalButtonText}>Not Ekle</Text>
        </Pressable>
        <Pressable
          style={styles.additionalButton}
          onPress={() => navigation.navigate("camera")}
          disabled
        >
          <Text style={styles.additionalButtonText}>Görüntü Ekle</Text>
        </Pressable>
        <Pressable disabled style={styles.additionalButton}>
          <Text style={styles.additionalButtonText}>Soruyu Sil</Text>
        </Pressable>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Notunuzu yazın..."
              value={note}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled onPress={() => setModalVisible(false)}>
                <Text style={styles.saveText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HistoryQuestionBox;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 5,
    borderBottomColor: "#7EBDC2",
    backgroundColor: "#F5F5F5",
  },
  questionContainer: {
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
  },
  answerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  answerButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "30%",
    backgroundColor: "#F3DFA2",
    borderRadius: 15,
  },
  answerButtonText: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
  },
  additionalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  additionalButton: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#D9D9D9",
  },
  additionalButtonText: {
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  modalContent: {
    justifyContent: "space-between",

    width: "80%",
    height: "30%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow on Android
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  saveText: {
    color: "blue",
    textAlign: "center",
    padding: 10,
  },
  cancelText: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
