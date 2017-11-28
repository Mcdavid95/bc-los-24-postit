import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const dateOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};
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
        <p style="color:palevioletred; font-weight:bold; margin-left:3%; top: 2%; font-family:kurale serif">POSTIT!!</>
      </div>
      <div style="padding: 8%">
        <div class="row">
          Hi, you have a new message:
        </div>
        <div class="next-container" style="border: 2px solid; margin-top:2%; padding: 2%; background-color: rgba(239, 239, 239, 0.96); border-radius:4%">
          <em><span style="color:palevioletred; padding-left:6%;">  @${message.username} </span></em>
                        <small>
                          <span style="background-color:#8A693E; padding-left:1%">${message.priority}</span>
                        </small>
                        <small><span className="createdAt"> sent: ${new Date(message.createdAt).toLocaleString('en-us', dateOptions)}</span></small>
                        <br />
                        <p>
                          <strong>
                            <span style="padding-left:6%" id="message-content">
                              ${message.message}
                            </span>


                          </strong>
                        </p>
        </div>
        <div style="border-top: 3px solid #2c3e56;"></div>
        <p style="font-weight: bold; font-family:kurale serif; color: palevioletred">POSTIT!!</p>
      </div>
     <div style="height: 8%; background-color: #2c3e56; width:100%">
       <p><small style="text-align: center; color:white;"> Copyright m.jeck</small></p>
      </div>
    </div>
  </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return ('Message sent: %s', info.messageId);
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
        <p style="color: palevioletred; font-weight:bold; margin-left: 3%; padding-top: 2%; font-family: kurale serif">POSTIT!!</p>
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
        <p style="font-weight: bold; font-family:kurale serif; color: palevioletred">POSTIT!!</p>
      </div>
      <div style="height: 8%; background-color: #2c3e56; width:100%">
      <p><small style="text-align: center; color:white;"> Copyright m.jeck</small></p>
     </div>
    </div>
  </div>
    `
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return error;
    }
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
        <p style="color: palevioletred; font-weight:bold; margin-left: 3%; padding-top: 2% font-family: kurale serif">POSTIT!!</p>
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
        <p style="font-weight: bold; font-family:kurale serif; color: palevioletred">POSTIT!!</p>
      </div>
      <div style="height: 8%; background-color: #2c3e56; width:100%">
        <p><small style="text-align: center; color:white;"> Copyright m.jeck</small></p>
      </div>
    </div>
  </div>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return (`Message ${info.messageId} send: ${info.response}`);
  });
};
