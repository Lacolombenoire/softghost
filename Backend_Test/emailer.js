import { sendEmail } from "../Backend/emailer.js";


// Exemple d'appel
(async () => {
  await sendEmail({
    from: `"Nicolas Tessier" <${process.env.EMAIL_USER}>`,
    to: "Nicolas_Tessier@icloud.com",
    subject: "Test SMTP Gmail",
    text: "Bonjour depuis Node.js !",
  });
})();
