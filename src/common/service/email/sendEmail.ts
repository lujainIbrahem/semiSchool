import nodemailer from "nodemailer";

export const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // smtp-relay.brevo.com
    port: 587, // أو 465
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Shefaa App" <${process.env.SMTP_USER}>`,
    ...mailOptions,
  });

  console.log("EMAIL INFO:", info);
  return info.accepted.length > 0;
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};