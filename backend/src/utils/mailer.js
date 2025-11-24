// Import Nodemailer, a library used to send emails from Node.js applications
import nodemailer from "nodemailer";
// =======================================================================
// sendOtpEmail(email, otp)
// Purpose:
// - Sends a One-Time Password (OTP) to a user via email
// - Used for login verification and authentication
// =======================================================================
export const sendOtpEmail = async (email, otp) => {
    // --------------------------------------------------------------
    // Create a transporter:
    // The transporter is the email service connection object.
    // It tells Nodemailer:
    // - which email provider to use
    // - which account to send emails from
    // - authentication credentials
    //
    // NOTE:
    // Gmail requires an "App Password" (not your real Gmail password)
    // when using less secure apps or Node.js email automation.
    // --------------------------------------------------------------
    const transporter = nodemailer.createTransport({
        service: "gmail", // Could also be "outlook", "yahoo", etc.
        auth: {
            user: process.env.EMAIL_USER, // Email address of sender (stored in .env)
            pass: process.env.EMAIL_PASS, // App password (more secure than real password)
        },
    });

    // --------------------------------------------------------------
    // Email structure / content:
    // - from: Who is sending the email
    // - to: Recipient's email address
    // - subject: Title of the email
    // - html: Email body formatted using HTML
    //
    // HTML templates allow colorful, structured emails
    // instead of plain-text messages.
    // --------------------------------------------------------------
    const mailOptions = {
        from: `"EchoHub" <${process.env.EMAIL_USER}>`, // Display name + email
        to: email,                                      // Receiver's email
        subject: "Your EchoHub OTP Code",               // Email subject line

        // HTML email body (beautiful template)
        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">
            <h2 style="color:#4f46e5;">EchoHub Login OTP</h2>
            <p>Hello 👋,</p>
            <p>Your One-Time Password (OTP) for login is:</p>

            <h3 style="background:#f3f4f6;padding:10px;border-radius:8px;
            text-align:center;letter-spacing:2px;">
                ${otp}
            </h3>

            <p>This code is valid for <b>5 minutes</b>.</p>
            <p>If you didn’t request this, please ignore this email.</p>
        </div>
        `,
    };


    // --------------------------------------------------------------
    // Send the email using the transporter
    // If there is an issue (wrong credentials, network error),
    // sendMail() will throw an error which should be handled
    // in the controller that calls this function.
    //
    // Equivalent status code meanings:
    // - 200 OK → Email sent successfully
    // - 500 Internal Server Error → Could not send email
    // --------------------------------------------------------------
    await transporter.sendMail(mailOptions);
};
