import nodemailer from "nodemailer";

export const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // 👈 رجعناها هنا عشان نكسر المشكلة
    },
  });

  const info = await transporter.sendMail({
from: '"Shefaa App" <appsafaa804@gmail.com>',
    ...mailOptions,
  });

  return info.accepted.length > 0;
};
export const generateOTP = async () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
}
