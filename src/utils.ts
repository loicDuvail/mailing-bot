import { readdirSync, readFileSync, statSync } from "fs";
import { join, sep } from "path";
import { Config } from "./types";

export function getConfig(configPath: string) {
  const path = join(__dirname, configPath);
  const configAsText = readFileSync(path).toString();
  return JSON.parse(configAsText) as Config;
}

export function getAttachments(config: Config) {
  const path = join(__dirname, "../", config.attachments_path);
  const filePaths = _getAllFiles(path);

  const files = filePaths.map((path) => ({
    path,
    filename: path.slice(path.lastIndexOf(sep) + 1),
  }));

  return files;
}

/**
 * returns every file paths inside a directory and its sub-directories
 */
function _getAllFiles(folderPath: string, _rec_memory: string[] = []) {
  const files = readdirSync(folderPath);

  for (const fileOrFolder of files) {
    const path = join(folderPath, fileOrFolder);
    if (statSync(path).isDirectory()) {
      _getAllFiles(path);
    } else {
      _rec_memory.push(path);
    }
  }

  return _rec_memory;
}

const _check_config: Config = {
  subject: "",
  text_path: "",
  html_path: "",
  attachments_path: "",
  nodemailer_user: "",
  nodemailer_pass: "",
  contacts: [],
  diagnostic_directory_path: "",
};

/**
 * @throws error if parsed config doesn't match its type
 */
export const checkConfig = (config: Config) => {
  Object.keys(_check_config).forEach((key) => {
    const value = config[key];
    if (!value.length)
      throw new Error(`Missing config "${key}" in config.json`);
  });
};
