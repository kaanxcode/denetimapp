import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../redux/features/auditSlice"; // Slice'dan actionları import et
import { router } from "expo-router";
import { clearPhoto, setPhoto } from "@/redux/features/cameraSlice";
import deleteQuestion from "@/api/deleteQuestion";

const QuestionBox = ({ question, documentId }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");
  const [noteText, setNoteText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { questions } = useSelector((state) => state.audit);
  const { photo } = useSelector((state) => state.camera);
  // useEffect(() => {
  //   console.log("photo => QuestionBox.tsx", photo);
  //   console.log("questions=> QuestionBox.tsx", question);
  //   console.log("answer => QuestionBox.tsx", answer);
  //   console.log("noteText => QuestionBox.tsx", noteText);
  //   console.log("questions => QuestionBox.tsx", questions);
  // }, [photo, question, answer, noteText, questions]);

  useEffect(() => {
    const handleSave = () => {
      const existingQuestionIndex = questions.findIndex(
        (q) => q.question === question
      );

      if (existingQuestionIndex !== -1) {
        const updatedQuestions = [...questions];
        const updatedQuestion = {
          ...updatedQuestions[existingQuestionIndex],
          answer: answer,
          note: noteText,
        };
        if (photo) {
          updatedQuestion.image = photo;
        }
        updatedQuestions[existingQuestionIndex] = updatedQuestion;
        dispatch(setQuestions(updatedQuestions));
        if (photo) {
          dispatch(clearPhoto());
        }
      } else {
        if (answer) {
          const newQuestion = {
            question: question,
            answer: answer,
            note: noteText,
          };
          if (photo) {
            newQuestion.image = photo;
          }
          dispatch(setQuestions([...questions, newQuestion]));
          if (photo) {
            dispatch(clearPhoto());
          }
        }
      }
    };

    handleSave();
  }, [answer, noteText, photo]);

  const handleAnswer = (value) => {
    setAnswer(value);
  };
  const handleDelete = () => {
    deleteQuestion("usersAudits", documentId, question)
      .then((success) => {
        if (success) {
          console.log("Soru başarıyla silindi.");
          Alert.alert("Soru Silindi!", "Lütfen Tekrar Giriniz", [
            {
              text: "Tamam",
              onPress: () => {
                router.back(); // Burada router.push() ile geri dönelim
              },
            },
          ]);
        } else {
          console.log("Soru silinemedi.");
          Alert.alert(
            "Sistem tarafından var olan sorular silinemez!",
            "Bu soru sistem tarafından eklenmiş bir sorudur. Lütfen sistem yöneticinizle iletişime geçiniz.",
            [
              {
                text: "Tamam",
              },
            ]
          );
        }
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };

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
          onPress={() => handleAnswer("Uygun")}
        >
          <Text style={styles.answerButtonText}>Uygun</Text>
        </Pressable>
        <Pressable
          style={[
            styles.answerButton,
            answer === "Uygun Değil" && { backgroundColor: "red" },
          ]}
          onPress={() => handleAnswer("Uygun Değil")}
        >
          <Text style={styles.answerButtonText}>Uygun Değil</Text>
        </Pressable>
        <Pressable
          style={[
            styles.answerButton,
            answer === "Uygulama Yok" && { backgroundColor: "grey" },
          ]}
          onPress={() => handleAnswer("Uygulama Yok")}
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
          onPress={() => {
            router.push("camera");
          }}
        >
          <Text style={styles.additionalButtonText}>Görüntü Ekle</Text>
        </Pressable>

        <Pressable style={styles.additionalButton} onPress={handleDelete}>
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
              value={noteText}
              onChangeText={(text) => setNoteText(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.saveText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  if (!noteText) {
                    setNoteText("");
                  }
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

export default QuestionBox;
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
