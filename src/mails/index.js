const path = require("path");
const { EventEmitter } = require("events");
const config = require("../config");
const Mail = require("../providers/mailer/Mail");
const Mailer = require("../providers/mailer/Mailer");

const templatePath = (template) => {
  return path.join(__dirname, "templates", `${template}.template.ejs`);
};

const mailSenderFactory = (template) => {
  const mail = new Mail({
    template: templatePath(template),
    from: config.mail.from,
  });
  console.log(config.mail.sgKey);
  return new Mailer(config.mail.sgKey).addMail(mail);
};

// Mail Event Handler
const mailer = new EventEmitter();
mailer.on("send", async (type, { account, message }) => {
  try {
    const mailSender = mailSenderFactory(type);
    mailSender.mail.addMessage(message).addRecipient(account);

    await mailSender.send();
  } catch (error) {
    mailer.emit("error", error);
  }
});

mailer.on("error", (error, ...args) => {
  throw error;
});

module.exports = mailer;
