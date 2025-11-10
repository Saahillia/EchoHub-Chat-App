import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // or "outlook", "yahoo"
        auth: {
        user: process.env.EMAIL_USER, // your Gmail ID
        pass: process.env.EMAIL_PASS, // app password, not Gmail password
        },
    });

    const mailOptions = {
        from: `"EchoHub" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your EchoHub OTP Code",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">
            <h2 style="color:#4f46e5;">EchoHub Login OTP</h2>
            <p>Hello 👋,</p>
            <p>Your One-Time Password (OTP) for login is:</p>
            <h3 style="background:#f3f4f6;padding:10px;border-radius:8px;text-align:center;letter-spacing:2px;">${otp}</h3>
            <p>This code is valid for <b>5 minutes</b>.</p>
            <p>If you didn’t request this, please ignore this email.</p>
        </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};
