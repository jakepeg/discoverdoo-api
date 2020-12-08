"use strict";
const config = require('./config');
const nodemailer = require("nodemailer");

const mailer = async function() {
  let transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.SMTP_PORT,
    secure: true,
    auth: {
      user: config.EMAIL_ADDRESS,
      pass: config.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"DiscoverDoo" <hello@discoverdoo.com>',
    to: "jakepeg@gmail.com",
    subject: "New listing",
    text: "Someone added a new listing and you need to validate and publish it",
  });
}

module.exports = mailer