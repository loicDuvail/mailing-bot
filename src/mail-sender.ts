import * as nodemailer from "nodemailer";
import { createCustomMail } from "./custom-mail";
import { Config, Contact } from "./types";
import { getAttachments } from "./utils";

import SMTPTransport = require("nodemailer/lib/smtp-transport");

const getTransport = (config: Config) =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    auth: {
      user: config.nodemailer_user,
      pass: config.nodemailer_pass,
    },
  });

const sendMail = (
  config: Config,
  contact: Contact,
  transport: nodemailer.Transporter,
  onSent: (err: Error, info: SMTPTransport.SentMessageInfo) => void
) =>
  transport.sendMail(
    {
      subject: config.subject,
      html: createCustomMail(config.html_path, contact),
      text: createCustomMail(config.text_path, contact),
      attachments: getAttachments(config),
      from: config.nodemailer_user,
      to: contact.email,
    },
    onSent
  );

/**
 * sends emails for every contacts in config.
 * No error handling nor way to know when task is done
 * @param config
 * @param onSent
 */
export function sendEmails(
  config: Config,
  onSent: (err: Error, info: SMTPTransport.SentMessageInfo) => void
) {
  const transport = getTransport(config);

  config.contacts.forEach((contact) =>
    sendMail(config, contact, transport, onSent)
  );
}

/**
 * Sends mail to every contact in config one after another
 * @param config
 * @param onSent called after a mail is successfuly sent
 * @returns A promise that resolves when all mails are sent or that throws an error if one occurs
 */
export function sendEmailsAsync(
  config: Config,
  onSent: (contact: Contact) => void
) {
  const transport = getTransport(config);

  return new Promise<void>((resolve, reject) => {
    _sendMailsRec(
      [...config.contacts],
      config,
      transport,
      (err, contact) => {
        if (err) return reject(err);
        onSent(contact);
      },
      resolve
    );
  });
}

function _sendMailsRec(
  contacts: Contact[],
  config: Config,
  transport: nodemailer.Transporter,
  onSent: (err: Error, contact: Contact) => void,
  onDone: () => void
) {
  const contact = contacts.pop();
  if (!contact) return onDone();

  sendMail(config, contact, transport, (err) => {
    onSent(err, contact);
    _sendMailsRec(contacts, config, transport, onSent, onDone);
  });
}
