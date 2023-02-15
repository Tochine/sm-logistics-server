const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const { MailtrapClient } = require("mailtrap");
const config = require("../../config");

// exports.mailMan = (to, subject, template) => {
//   const sendgridKey = config.mail.sgKey;
//   sgMail.setApiKey(sendgridKey);
  
//   const msg = {
//     to,
//     from: config.mail.from,
//     subject,
//     text: " ",
//     html: template,
//     // templateId: "d-4f026fbaa4e24c359a304e6fff47b4a6",

//   };
//   sgMail.send(msg)
//     .then((response) => console.log(response))
//     .catch((error) => {
//       throw error;
//     });
// };

// module.exports.mailMan = async (to, subject, template) => {
//   const client = new MailtrapClient({ token: config.mail.mailtrap_token });
//   await client.send({
//     from: { name: 'SM Logistics', email: config.app.appEmail},
//     to: [{ email: to }],
//     subject: subject,
//     html: template
//   })
//   .then((response) => console.log(response))
//   .catch((err) => console.log(err))
// }

module.exports.mailMan = async (to, subject, template) => {
try {
    let transporter = nodemailer.createTransport({
      host: config.mailtrap.url,
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.mailtrap.user, // generated ethereal user
        pass: config.mailtrap.pass
      }
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻"' + config.app.appEmail, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: template, // html body
    });
    console.log("Message sent: %s", info.messageId);
    return 0;
  } catch (error) {
    console.log(error)
  }
}
