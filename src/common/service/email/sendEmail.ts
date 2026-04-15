import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";



export const sendEmail = async (mailOptions: Mail.Options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"lojy" <${process.env.EMAIL}>`,
      ...mailOptions,
    });

    return info.accepted.length > 0;
  } catch (error) {
    console.error("Email error:", error);
    return false; // بدل ما السيرفر يقع
  }
};




export const generateOTP = async () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
}
