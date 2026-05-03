import EventEmitter from "events"
import { emailTemplate, sendEmail } from "src/common"
import { UserOtp } from "src/common/enums"

export const eventEmitter= new EventEmitter()
eventEmitter.on(UserOtp.confirmEmail, async (data) => {
  try {
    const { email, otp } = data;

    await sendEmail({
      to: email,
      subject: "Confirm Email",
      html: emailTemplate(otp),
    });

    console.log("OTP sent successfully");
  } catch (err) {
    console.error("Email failed:", err);
  }
});
 eventEmitter.on(UserOtp.forgetPassword, async (data) => {
  try {
    const { email, otp } = data
    await sendEmail({
      to: email,
      subject: UserOtp.forgetPassword,
      html: emailTemplate(otp)
    })
  } catch (err) {
    console.log("Email Error:", err.message)
  }
})