const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text
    });
  } catch (error) {
    console.error("Email Error:", error.message);
    throw new Error("Email sending failed");
  }
};