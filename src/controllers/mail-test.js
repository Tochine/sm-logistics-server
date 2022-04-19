const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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",
);
// const msg = {
//   to: 'obisiket@gmail.com',
//   from: 'tochiadams3@gmail.com', // Use the email address or domain you verified above
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// //ES6
// sgMail
//   .send(msg)
//   .then(() => {}, error => {
//     console.error(error);
//     if (error.response) {
//       console.error(error.response.body)
//     }
//   });
const { MailerTemplateSetup, Mail } = require("mail-template-sender");
const { SendGridProvider } = require("mail-template-sender/providers");
const path = require("path");

const provider = new SendGridProvider(sgMail);
const mailer = MailerTemplateSetup.config({
  provider,
  templateDir: path.join(__dirname, "src", "mails", "templates"),
});
const mail = new Mail({
  template: "verification",
  to: "tochiadams3@gmail.com",
  from: "tochiadams3@gmail.com", // Use the email address or domain you verified above
  subject: "From My Mailer",
});
mail.addData({ user: "Blessed" });
mailer.mailSender.send(mail);
// const ejsRender = ({template, data}, cb) => {
//   ejs.renderFile(template, data, {}, cb)
// }
// (async () => {
//   const renderedMail = await promisify(ejsRender)({
//   template: './src/mails/templates/verification.template.ejs', data: {}})
//   console.log(renderedMail)
// })()
