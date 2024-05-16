import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore yapılandırması burada yapılmış olmalı

const getHistory = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "auditsHistory"));

    const auditsHistory = [];
    querySnapshot.forEach((doc) => {
      // Her belgeyi al ve id'siyle birlikte içeriğini oluştur
      auditsHistory.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return auditsHistory;
  } catch (error) {
    console.error("Error getting audits history: ", error);
    throw error;
  }
};

export default getHistory;
