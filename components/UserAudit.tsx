import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import deleteDocument from "@/api/deleteHistory";

const UserAudit = ({ userAuditData, onValueChange }) => {
  console.log("userAuditData => UserAudit.tsx", userAuditData);
  const handlePress = () => {
    const questions = userAuditData.questions || [];
    router.push({
      pathname: "[Audit]",
      params: {
        auditName: userAuditData.auditName,
        auditSector: userAuditData.auditSector,

        auditQuestions: questions.map((question) => question.question),
        documentId: userAuditData.id,
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
            deleteDocument("usersAudits", userAuditData.id).then(() => {
              Alert.alert(
                "Silme İşlemi Başarılı!",
                "Lütfen Sayfayı Yenileyin",
                [
                  {
                    text: "Tamam",
                    onPress: () => {
                      onValueChange(true);
                    },
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

  return (
    <>
      {userAuditData ? (
        <Pressable
          style={styles.container}
          onLongPress={handleLongPress}
          onPress={handlePress}
        >
          <View style={styles.iconContainer}>
            <FontAwesome6 name="file-pen" size={24} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{userAuditData.auditName}</Text>
            {/* Audit adını auditData'dan alın */}
            <Text style={styles.subTitle}>{userAuditData.auditSector}</Text>
            {/* Sektör adını auditData'dan alın */}
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome6 name="user-pen" size={20} color="black" />
          </View>
        </Pressable>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserAudit;

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
