import { createDiagnostic } from "./diagnostic";
import { sendEmailsAsync } from "./mail-sender";
import { Contact } from "./types";
import { checkConfig, getConfig } from "./utils";

console.info("Loading config...");

const config = getConfig("../config.json");
checkConfig(config);

console.info("Config successfuly loaded");

console.info(
  `${config.contacts.length} email address${
    config.contacts.length ? "es" : ""
  } found. Starting the sending process...`
);

const reachedContacts: Contact[] = [];

sendEmailsAsync(config, (contact) => {
  console.info(`email sent to ${contact.email}`);
  reachedContacts.push(contact);
})
  .then(() => console.info("all done!"))
  .catch((err) => {
    console.error(err);
    createDiagnostic(reachedContacts, config);
  });
