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

// const mailOptions = {
//   from: "devahmadj@gmail.com",
//   to: "some.other.email@gmail.com",
//   subject: "Node.js Email with Secure OAuth",
//   generateTextFromHTML: true,
//   html: "<b>test</b>"
// };


// SMTP credentials
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'devahmadj@gmail.com',
//     pass: 'Mutaal@2468'
//   }
// });

/**
 * 
 * @param {Object} user 
 * @param {String} password 
 */
const sendEmail = async (email, name, password) => {
  const mailOptions = {
    from: 'devahmadj@gmail.com',
    to: email,
    subject: 'Your password for Cars System authentication',
    generateTextFromHTML: true,
    html: `Hello ${name},\n\nYour password for Cars System authentication is ${password}.\n\nPlease change it, if you feel like it :) .\n\nThank you.`
  };
  // try {

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });

  //   await smtpTransport.sendMail(mailOptions);
  //   console.log('Email sent successfully');
  // } catch (error) {
  //   console.error('Error sending email:', error);
  // }
};

module.exports = {
  sendEmail
};