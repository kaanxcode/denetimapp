import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const deleteQuestion = async (collectionName, documentId, questionToDelete) => {
  try {
    // Belirli bir koleksiyondaki belgeyi referans al
    const docRef = doc(db, collectionName, documentId);

    // Belgedeki verileri al
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error("Belge bulunamadı.");
      return false; // Belge bulunamazsa false döndür
    }

    // Belgedeki questions dizisinden belirli bir soruyu silmek için yeni bir dizi oluştur
    const updatedQuestions = docSnap
      .data()
      .questions.filter((question) => question.question !== questionToDelete);

    // Belgeyi güncelle ve yeni questions dizisini kullan
    await updateDoc(docRef, {
      questions: updatedQuestions,
    });

    console.log("Soru başarıyla silindi.");
    return true; // Başarı durumunu döndür
  } catch (error) {
    console.error("Soru silinirken bir hata oluştu:", error);
    return false; // Hata durumunu döndür
  }
};

export default deleteQuestion;
