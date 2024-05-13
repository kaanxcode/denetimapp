import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const AuditBox = ({ auditData }) => {
  // console.log("auditData => AuditBox.tsx", auditData);
  // console.log(
  //   "auditData.auditName => AuditBox.tsx",
  //   auditData.questions[0].question
  // );

  const handlePress = () => {
    router.push({
      pathname: "[Audit]",
      params: {
        auditName: auditData.auditName,
        auditSector: auditData.auditSector,
        auditQuestions: auditData.questions.map(
          (question) => question.question
        ),
      },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <FontAwesome6 name="file-pen" size={24} color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{auditData.auditName}</Text>
        {/* Audit adını auditData'dan alın */}
        <Text style={styles.subTitle}>{auditData.auditSector}</Text>
        {/* Sektör adını auditData'dan alın */}
      </View>
    </Pressable>
  );
};

export default AuditBox;

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
