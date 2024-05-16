import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import React from "react";
import HistoryQuestionBox from "@/components/HistoryQuestionBox";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
import HistoryFormComponent from "@/components/HistoryFormComponent";

const HistoryAudit = () => {
  const route = useRoute();
  const { questions } = route.params.auditQuestions;
  const { infos } = route.params;
  //console.log("auditQuestions => HistoryAudit.tsx", questions);

  return (
    <ScrollView style={styles.container}>
      {questions.map((questionData, index) => (
        <HistoryQuestionBox
          key={index}
          question={questionData.question}
          answer={questionData.answer}
          note={questionData.note}
        />
      ))}
      <HistoryFormComponent infos={infos} />
    </ScrollView>
  );
};

export default HistoryAudit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
