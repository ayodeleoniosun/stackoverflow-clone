import dotenv from "dotenv";
dotenv.config();

const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

export const sendMail = (
  to: string,
  subject: string,
  fullname: string = null,
  topic: string = null
) => {
  const html = `Dear ${fullname}, someone commented on your topic - ${topic}.`;

  const data = {
    from: "Global Accelerex <info@globalaccelerex.com>",
    to,
    subject,
    html,
  };

  mailgun.messages().send(data, (err, response) => {
    console.log(response);
  });
};
