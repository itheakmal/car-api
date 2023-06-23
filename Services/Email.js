const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // ClientID
  process.env.CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "devahmadj@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken
  }
});


/**
 * 
 * @param {Object} user 
 * @param {String} password 
 */
const sendEmail = async (name, email, password) => {
  console.log(email, name, password)
  const mailOptions = {
    from: 'devahmadj@gmail.com',
    to: `${email}`,
    subject: 'Your password for Cars System authentication',
    generateTextFromHTML: true,
    html: `Hello ${name},\n\nYour password for Cars System authentication is ${password}.\n\nPlease change it, if you feel like it :) .\n\nThank you.`
  };
  try {
    await smtpTransport.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmail
};