import { db } from "@/firebaseConfig";
import firebase from "firebase/app";
import { doc, deleteDoc } from "firebase/firestore";

// Belirli bir koleksiyondan belgeyi silen fonksiyon
const deleteDocument = async (collectionName, documentId) => {
  try {
    // Belgeyi sil
    await deleteDoc(doc(db, collectionName, documentId));
    console.log("Belge başarıyla silindi.");
    return true; // Başarı durumunu döndür
  } catch (error) {
    console.error("Belge silinirken bir hata oluştu:", error);
    return false; // Hata durumunu döndür
  }
};

export default deleteDocument;
