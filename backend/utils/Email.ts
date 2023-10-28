import nodemailer from "nodemailer";
import pug from "pug";

class Email {
  private to;
  private name;
  private url;
  private from;

  constructor(user: any, url: string) {
    this.to = user.email;
    this.name = user.fullname.split(" ")[0];
    this.url = url;
    this.from = process.env.EMAIL_USER;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(template: string, subject: string) {
    const html = pug.renderFile(`${__dirname}/../views/emailTemplates/${template}.pug`, {
      subject,
      name: this.name,
      url: this.url,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send("resetToken", "Your password reset token (valid for only 10 minutes)");
  }
}

export default Email;
