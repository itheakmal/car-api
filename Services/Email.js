const nodemailer = require('nodemailer');

// SMTP credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'devahmadj@gmail.com',
    pass: 'Mutaal@2468'
  }
});

/**
 * 
 * @param {Object} user 
 * @param {String} password 
 */
const sendEmail = async (user, password) => {
  const mailOptions = {
    from: 'devahmadj@gmail.com',
    to: user.email,
    subject: 'Your password for Cars System authentication',
    text: `Hello ${user.name},\n\nYour password for Cars System authentication is ${password}.\n\nPlease change it, if you feel like it :) .\n\nThank you.`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmail
};