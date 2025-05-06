export interface Contact {
  email: string;
  name: string;
}

export interface Config {
  subject: string;
  text_path: string;
  html_path: string;
  attachments_path: string;
  nodemailer_user: string;
  nodemailer_pass: string;
  contacts: Contact[];
  diagnostic_directory_path: string;
}
