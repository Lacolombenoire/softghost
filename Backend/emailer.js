import nodemailer from "nodemailer";
import dotenv from "dotenv";



// Charger le .env dans process.env
dotenv.config({ path: '../.env' })

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

async function sendEmail({ from, to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP connecté avec succès !");

    const info = await transporter.sendMail({ from, to, subject, text, html });
    console.log("✅ Email envoyé :", info.messageId);
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi :", error);
  }
}



// ✅ Exporter la fonction pour qu'elle soit utilisable ailleurs
export { sendEmail };
