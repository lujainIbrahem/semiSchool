export const emailTemplate=(otp:string)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f7fb;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f0f7fb;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border-collapse: collapse; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #4a90a4 0%, #5ba3b8 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">Medical Center</h1>
                            <p style="margin: 8px 0 0 0; color: #e8f4f8; font-size: 14px; font-weight: 400;">Healthcare You Can Trust</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 40px 30px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #2c5a6a; font-size: 22px; font-weight: 600; text-align: center;">Verification Code</h2>
                            <p style="margin: 0 0 30px 0; color: #546e7a; font-size: 15px; line-height: 1.6; text-align: center;">Please use the following code to complete your verification:</p>
                            
                            <!-- OTP Code Box -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="text-align: center; padding: 20px 0;">
                                        <div style="display: inline-block; background: linear-gradient(135deg, #e3f2f7 0%, #d4eaf2 100%); border: 2px solid #89c4d4; border-radius: 8px; padding: 25px 50px;">
                                            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #2c5a6a; font-family: 'Courier New', monospace;">${otp}</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 25px 0 0 0; color: #78909c; font-size: 14px; text-align: center; font-style: italic;">
                                <span style="color: #d32f2f; font-weight: 600;">⏱</span> This code expires in 5 minutes
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Security Note -->
                    <tr>
                        <td style="padding: 0 40px 35px 40px;">
                            <div style="background-color: #f5fafb; border-left: 3px solid #89c4d4; padding: 15px 20px; border-radius: 4px;">
                                <p style="margin: 0; color: #546e7a; font-size: 13px; line-height: 1.5;">
                                    <strong style="color: #2c5a6a;">Security tip:</strong> Never share this code with anyone. Our staff will never ask for your verification code.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fbfc; padding: 25px 40px; border-top: 1px solid #e0eef3;">
                            <p style="margin: 0 0 10px 0; color: #78909c; font-size: 13px; text-align: center; line-height: 1.5;">
                                If you didn't request this verification code, please ignore this email.
                            </p>
                            <p style="margin: 0; color: #90a4ae; font-size: 12px; text-align: center;">
                                © 2024 Medical Center. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}