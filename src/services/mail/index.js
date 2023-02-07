const sgMail = require("@sendgrid/mail");
const config = require("../../config");

exports.mailMan = (to, subject, template) => {
  const sendgridKey = config.mail.sgKey;
  sgMail.setApiKey(sendgridKey);
  
  const msg = {
    to,
    from: config.mail.from,
    subject,
    text: " ",
    html: template,
    // templateId: "d-4f026fbaa4e24c359a304e6fff47b4a6",

  };
  sgMail.send(msg)
    .then((response) => console.log(response))
    .catch((error) => {
      throw error;
    });
};
