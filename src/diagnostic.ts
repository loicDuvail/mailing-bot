import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Config, Contact } from "./types";

export function createDiagnostic(reachedContacts: Contact[], config: Config) {
  const unreachedContacts = config.contacts.filter(
    (contact) =>
      !reachedContacts.some(
        (reachedContact) => contact.email === reachedContact.email
      )
  );

  const diagnostic = {
    reached: reachedContacts,
    unreached: unreachedContacts,
  };

  writeFile(
    join(__dirname, "../", config.diagnostic_directory_path, "diagnostic.json"),
    JSON.stringify(diagnostic)
  );
}
