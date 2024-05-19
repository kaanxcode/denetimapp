import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import QuestionBox from "@/components/QuestionBox";
import FormComponent from "@/components/FormComponent";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { setAuditInfo, setInitialState } from "@/redux/features/auditSlice";
import { useDispatch } from "react-redux";

const Audit = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { auditName, auditQuestions, auditSector } = route.params;

  // console.log("auditQuestions => Audit.tsx", auditQuestions);

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [auditQ, setAuditQ] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    // console.log("auditName => Audit.tsx", auditName);
    // console.log("auditSector => Audit.tsx", auditSector);
    dispatch(setAuditInfo({ auditName, auditSector }));
  }, [dispatch, auditName, auditSector]);

  useEffect(() => {
    if (auditQuestions) {
      const questions = auditQuestions.split(",");
      setAuditQ(questions);
    }
  }, [auditQuestions]);

  const saveQuestion = () => {
    setAuditQ([...auditQ, question]);
    setModalVisible(!modalVisible);
    setQuestion("");
  };

  // sayfadan çıkıldığında redux state'i sıfırlar
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      // Geri gidildiğinde sıfırlama işlemini gerçekleştir
      dispatch(setInitialState());
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: auditName,
      headerRight: () => (
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={auditQ}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <QuestionBox question={item} />}
      />

      <FormComponent />

      {/* Modal */}
      <Modal
        animationType="slide" // You can choose your desired animation type
        transparent={true} // This makes the modal transparent
        visible={modalVisible} // Controls whether the modal is visible or not
        onRequestClose={() => {
          setModalVisible(!modalVisible); // This is called when Android back button is pressed
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Soru Yazın"
              value={question}
              onChangeText={setQuestion}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={saveQuestion}>
                <Text style={styles.saveText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.cancelText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Audit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE6DD",
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
