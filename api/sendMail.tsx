import * as MailComposer from "expo-mail-composer";

export async function sendMail({ file, recipients }) {
  try {
    const isAvailable = await MailComposer.isAvailableAsync();

    if (!isAvailable) {
      throw new Error("Mail services are not available.");
    }
    let recipientsArray = recipients.split(",").map((email) => email.trim());
    await MailComposer.composeAsync({
      subject: "Denetim Belgeleri",
      body: "Denetim Belgeleri Ektedir",
      recipients: recipientsArray,
      attachments: [file],
    });

    console.log("Mail sent successfully");
  } catch (error) {
    console.error("Failed to send mail:", error);
  }
}
