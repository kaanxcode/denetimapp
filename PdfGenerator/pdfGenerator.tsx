import React from "react";
import reactNativeHTMLToPdf from "react-native-html-to-pdf";

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

export default getDateTimeString;

export const pdfGenerator = async () => {
  const time = getDateTimeString();

  const html = "<h1>PDF TEST</h1>";

  const options = {
    html: html,
    fileName: time,
    directory: "Documents",
  };

  try {
    const file = await reactNativeHTMLToPdf.convert(options);
    console.log(file);
    return file;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
