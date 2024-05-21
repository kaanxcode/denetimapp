import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";

import AsyncStorage from "@react-native-async-storage/async-storage";

const getDateTimeString = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const dateString = `${day}-${month}-${year}`;
  const timeString = `${hours}-${minutes}`;

  return `${dateString}-${timeString}`;
};

const convertImageToBase64 = async (uri) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return "";
  }
};

const generateTableRows = (questions) => {
  return questions
    .map(
      (question, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${question.question}</td>
            <td>${question.answer === "Uygun" ? "X" : ""}</td>
            <td>${question.answer === "Uygun Değil" ? "X" : ""}</td>
            <td>${question.answer === "Uygulama Yok" ? "X" : ""}</td>
            <td>${question.note}</td>
            <td>${
              question.image
                ? `<img src="${question.image}" style="width: 100px;" />`
                : ""
            }</td>
          </tr>
        `
    )
    .join("");
};

const generateHTML = (audit) => {
  const questionsPerPage = 10;
  const numberOfPages = Math.ceil(audit.questions.length / questionsPerPage);
  let html = `
      <style>
        @page {
          margin: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td, th {
          border: 1px solid black;
          padding: 4px;
        }
        .page-break {
          page-break-after: always;
        }
        img {
          max-width: 100px;
          max-height: 100px;
        }
      </style>
      <table>
        <tbody>
          <tr>
            <td>Denetim: ${audit.nameAudit}</td>
            <td>Denetleme Tarihi: ${audit.infos.inspectionDate}</td>
          </tr>
          <tr>
            <td>Firma: ${audit.infos.companyName}</td>
            <td>Denetleyen: ${audit.infos.inspector}</td>
          </tr>
          <tr>
            <td>Lokasyon / Bölge: ${audit.infos.location}</td>
            <td>Genel Notlar: ${audit.infos.generalNotes}</td>
          </tr>
        </tbody>
      </table>
    `;

  for (let i = 0; i < numberOfPages; i++) {
    const start = i * questionsPerPage;
    const end = start + questionsPerPage;
    const questionsChunk = audit.questions.slice(start, end);

    html += `
        <table>
          <tbody>
            <tr>
              <th>No</th>
              <th>Soru</th>
              <th>Uygun</th>
              <th>Uygun Değil</th>
              <th>Uygulama Yok</th>
              <th>Not</th>
              <th>Görüntü</th>
            </tr>
            ${generateTableRows(questionsChunk)}
          </tbody>
        </table>
        ${i < numberOfPages - 1 ? '<div class="page-break"></div>' : ""}
      `;
  }

  return html;
};

export const pdfGenerator = async (audit) => {
  const time = getDateTimeString();

  const questionsWithBase64Images = await Promise.all(
    audit.questions.map(async (question) => {
      if (question.image) {
        const base64Image = await convertImageToBase64(question.image);
        return {
          ...question,
          image: base64Image,
        };
      }
      return question;
    })
  );

  const html = generateHTML({ ...audit, questions: questionsWithBase64Images });

  try {
    const file = await Print.printToFileAsync({
      html: html,
      base64: false,
    });

    return file.uri;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
