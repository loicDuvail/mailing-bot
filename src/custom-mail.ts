import * as fs from "fs";
import * as path from "path";

/**
 *
 * @param filePath path of an text/html file in wich to inject data.
 * This file thus supports the "${}" styntax for data injection
 * @param data the data object to inject inside the text/html file
 * @param onCreated callback called when the text is successfuly injected with the data
 */
export function createCustomMail(filePath: string, data: object) {
  const fileText = fs.readFileSync(path.resolve(filePath));
  const customisedMail = eval(`\`${fileText}\``);
  return customisedMail;
}
