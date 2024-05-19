import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { FontAwesome6 } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import deleteDocument from "@/api/deleteHistory";

const HistoryAuditBox = ({ historyAuditData }) => {
  console.log("historyAuditData => HistoryAuditBox.tsx", historyAuditData);
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("(stack)", {
      screen: "history-audit",
      params: {
        auditQuestions: historyAuditData,
        infos: historyAuditData.infos,
      },
    });
  };

  const handleLongPress = () => {
    Alert.alert(
      "Silme İşlemi",
      "Bu denetimi geçmişinizden silmek istediğinize emin misiniz?",
      [
        {
          text: "Evet",
          onPress: () => {
            deleteDocument("auditsHistory", historyAuditData.id).then(() => {
              Alert.alert(
                "Silme İşlemi Başarılı!",
                "Lütfen Sayfayı Yenileyin",
                [
                  {
                    text: "Tamam",
                    onPress: () => {},
                  },
                ]
              );
            });

            //console.log(historyAuditData.id);
          },
        },
        {
          text: "Hayır",
          onPress: () => {
            console.log("Silme işlemi iptal edildi");
          },
        },
      ]
    );
  };

  // console.log(
  //   "question => HistoryAuditBox.tsx",
  //   historyAuditData.questions.map((q) => ({
  //     question: q.question,
  //     answer: q.answer,
  //     note: q.note,
  //   }))
  // );
  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <View style={styles.iconContainer}>
        <FontAwesome6 name="file-pen" size={24} color="red" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {historyAuditData.infos.companyName} -{" "}
          {historyAuditData.infos.location}
        </Text>
        {/* Audit adını auditData'dan alın */}
        <Text style={styles.subTitle}>
          {historyAuditData.nameAudit} - {historyAuditData.infos.inspectionDate}
        </Text>
        {/* Sektör adını auditData'dan alın */}
      </View>
    </Pressable>
  );
};

export default HistoryAuditBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#7EBDC2",
    backgroundColor: "#F5F5F5",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 4,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    color: "#776F71",
    fontSize: 14,
  },
});
