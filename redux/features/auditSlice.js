import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const saveAndSend = createAsyncThunk(
  "audit/saveAndSend",
  async (_, { getState, dispatch }) => {
    try {
      const { audit } = getState();
      const docRef = await addDoc(collection(db, "auditsHistory"), {
        nameAudit: audit.nameAudit,
        nameSector: audit.nameSector,
        questions: audit.questions,
        infos: audit.infos,
      });
      dispatch(setQuestions([]));
      dispatch(setInfos([]));
      dispatch(setAuditInfo({ auditName: null, auditSector: null }));
      console.log("Veriler Firestore'a başarıyla yüklendi!");
    } catch (error) {
      console.error("Verileri Firestore'a yüklerken bir hata oluştu:", error);
      throw error; // Hata durumunda hatayı yeniden fırlat
    }
  }
);

export const auditSlice = createSlice({
  name: "audit",
  initialState: {
    nameAudit: null,
    nameSector: null,
    questions: [],
    infos: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setInfos: (state, action) => {
      state.infos = action.payload;
    },
    setAuditInfo: (state, action) => {
      state.nameAudit = action.payload.auditName;
      state.nameSector = action.payload.auditSector;
    },
    setInitialState: (state) => {
      state.nameAudit = null;
      state.nameSector = null;
      state.questions = [];
      state.infos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveAndSend.fulfilled, (state) => {
      // Firestore'a başarıyla yükleme işlemi tamamlandığında Redux state'ini güncelle
      state.questions = [];
      state.infos = [];
      state.nameAudit = null;
      state.nameSector = null;
    });
  },
});

export const { setQuestions, setInfos, setAuditInfo, setInitialState } =
  auditSlice.actions;

export default auditSlice.reducer;
