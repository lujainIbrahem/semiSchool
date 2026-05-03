import * as SibApiV3Sdk from '@sendinblue/client';

export const sendEmail = async (mailOptions: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> => {
  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY as string
    );

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: 'Shefaa App',
      email: 'appsafaa804@gmail.com', // sender verified in Brevo
    };

    sendSmtpEmail.to = [{ email: mailOptions.to }];
    sendSmtpEmail.subject = mailOptions.subject;
    sendSmtpEmail.htmlContent = mailOptions.html;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('✅ Email sent successfully');
    return true;

  } catch (error) {
    console.error('❌ Email Error:', error);
    return false;
  }
};
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};