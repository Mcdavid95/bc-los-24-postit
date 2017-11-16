import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @function sendUrgentMail
 * @param {*} users 
 * @param {*} message 
 * @returns {*} Email notification
 */
export const sendUrgentMail = (users, message) => {
  let receivers = '';

  users.forEach((user) => {
    receivers += `${user.email},`;
  });


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mcdavidemereuwa95@gmail.com',
      pass: 'Jabike_13'
    }
  });

  const mailOptions = {
    from: 'POSTIT!!!',
    to: receivers,
    subject: 'URGENT',
    html: `
    <div style="width: 100%; background-color: grey; padding: 2%;">
    <div style="width: 60%; background-color: white; margin: auto;">
      <div style="height: 8%; background-color: #2c3e56; width:100%">
        <h6 style="color: palevioletred; margin-left: 3%; top: 2% font-family: kurale serif">POSTIT!!</h6>
      </div>
      <div style="padding: 8%">
        <div class="row">
          Hi, you have a new message:
        </div>
        <div class="next-container" style="border: 2px solid; margin-top:2%; padding: 2%;">
          ${message.message}
        </div>
        <div style="border-top: 3px solid #2c3e56;"></div>
        <p style="font-weight: bold; color: palevioletred">POSTIT!!</p>
      </div>
    </div>
  </div>
    `
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
/**
 * @function sendUrgentMail
 * @param {*} token 
 * @param {*} email
 * @param {*} host
 * @returns {*} Email notification
 */
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
    html: `
    <div style="width: 100%; background-color: grey; padding: 2%;">
    <div style="width: 60%; background-color: white; margin: auto;">
      <div style="height: 8%; background-color: #2c3e56; width:100%">
        <p style="color: palevioletred; margin-left: 3%; padding-top: 2% font-family: kurale serif">POSTIT!!</p>
      </div>
      <div style="padding: 8%">
        <div class="row">
          You are receiving this because you (or someone else) 
    have requested the reset of the password for your account.
    Please click on the following link or paste this into your browser 
    to complete the process
        </div>
        <div>
          <br>
          <a href="http://${host}/reset/${token}"><button style="background-color: teal; color: white">Reset Password</button></a>
        </div>
        <p style="font-weight: bold; color: palevioletred">POSTIT!!</p>
      </div>
    </div>
  </div>
    `
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return console.log(error);
    }

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};
/**
 * @function sendUrgentMail
 * @param {*} email
 * @returns {*} Email notification
 */
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
    html: ` <div style="width: 100%; background-color: grey; padding: 2%;">
    <div style="width: 60%; background-color: white; margin: auto;">
      <div style="height: 8%; background-color: #2c3e56; width:100%">
        <p style="color: palevioletred; margin-left: 3%; padding-top: 2% font-family: kurale serif">POSTIT!!</p>
      </div>
      <div style="padding: 8%">
        <div class="row">
          This email confirms that your new POSTIT password has been set.
    You can now access your Account.
        </div>
          <br>
          Thanks.
        <div>
          <br>
        </div>
        <p style="font-weight: bold; color: palevioletred">POSTIT!!</p>
      </div>
    </div>
  </div>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message ${info.messageId} send: ${info.response}`);
  });
};
