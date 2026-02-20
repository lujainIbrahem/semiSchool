import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const sendEmail = async (mailOptions: Mail.Options)=>{
    
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // يجب أن تكون false مع port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, 
  },
  tls: {
    rejectUnauthorized: false // هذا السطر يحل مشاكل شهادات الأمان والـ socket
  }
});

  const info = await transporter.sendMail({
    from: `"lojy" ${process.env.EMAIL}`,
    ...mailOptions
  });
  if (info.accepted.length>0){
    return true
  }
  else{
    return false
  }

};
export const generateOTP = async () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
}
