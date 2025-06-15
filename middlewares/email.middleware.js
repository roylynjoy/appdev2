const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");

// Load environment variables
const MAILTRAP_HOST = process.env.MAILTRAP_HOST;
const MAILTRAP_PORT = process.env.MAILTRAP_PORT;
const MAILTRAP_USERNAME = process.env.MAILTRAP_USERNAME;
const MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD;
const DEFAULT_RECEIVER = process.env.DEFAULT_RECEIVER;

// Reusable transporter
const transporter = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  auth: {
    user: MAILTRAP_USERNAME,
    pass: MAILTRAP_PASSWORD,
  },
});

// Main export: function that sends email
const sendBookCreatedEmail = async (book) => {
  try {
    // Compile the Pug template to HTML
    const html = pug.renderFile(
      path.join(__dirname, "../views/bookCreated.pug"),
      {
        title: book.title,
        author: book.author,
        year: book.year,
      }
    );

    // Define email options
    const mailOptions = {
      from: `"Book System" <${MAILTRAP_USERNAME}>`,
      to: DEFAULT_RECEIVER, // or book.userEmail if using dynamic user emails
      subject: "New Book Added",
      html: html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = sendBookCreatedEmail;
