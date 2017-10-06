import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendUrgentMail = (users, message) => {
  let receivers = '';

  users.forEach((user) => {
    receivers += `${user.email}`;
  });
  console.log(receivers);


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: receivers,
    subject: 'urgent',
    text: message,
    html: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};

export const resetPasswordMail = (token, email, host) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mcdavidemereuwa95@gmail.com',
      pass: 'Jabike_13'
    }
  });

  const mailOptions = {
    from: '"PostIt" <mcdavidemereuwa95@gmail.com>',
    to: email,
    subject: 'POSTIT PASSWORD RESET',
    text: `You are receiving this because you (or someone else) 
    have requested the reset of the password for your account.\n\n
    Please click on the following link or paste this into your browser 
    to complete the process: \n\n
    http://${host}/reset/${token}\n\n
    If you did not request this, please ignore this mail and your 
    password will remain unchanged.`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return console.log(error);
    }

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};

export const sendSuccessfulResetMail = (email) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mcdavidemereuwa95@gmail.com',
      pass: 'Jabike_13'
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"PostIt" <mcdavidemereuwa95@gmail.com>',
    to: email,
    subject: 'POSTIT PASSWORD CHANGE SUCCESSFUL',
    text: `This email confirms that your new POSTIT password has been set.\n\n
    You can now access your Account.`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message ${info.messageId} send: ${info.response}`);
  });
};
