import nodemailer from "nodemailer";

export const sendEmail = async (mailOptions) => {
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
});

  const info = await transporter.sendMail({
    from: `"Shefaa App" <appsafaa804@gmail.com>`,
    ...mailOptions,
  });

  return info.accepted.length > 0;
};
export const generateOTP = async () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
}
