import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore yapılandırması burada yapılmış olmalı
import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage'den kullanıcı kimlik bilgilerini almak için bir fonksiyon
const getUserUid = async () => {
  try {
    const userUid = await AsyncStorage.getItem("userUid");
    return userUid;
  } catch (error) {
    console.error("Error getting userUid from AsyncStorage: ", error);
    throw error;
  }
};

const getUserAudits = async () => {
  try {
    const userUid = await getUserUid();
    //console.log("userUid => getHistory.tsx", userUid);
    const querySnapshot = await getDocs(
      query(collection(db, "usersAudits"), where("userUid", "==", userUid))
    );

    const userAudits: any = [];
    querySnapshot.forEach((doc) => {
      // Her belgeyi al ve id'siyle birlikte içeriğini oluştur
      userAudits.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("userAudits => getHistory.tsx", userAudits);
    return userAudits;
  } catch (error) {
    console.error("Error getting audits history: ", error);
    throw error;
  }
};

export default getUserAudits;
