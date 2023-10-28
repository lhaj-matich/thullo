import { createCipheriv, createDecipheriv } from "crypto";

class EncryptText {
  private text;
  private algorithm;
  private key;
  private iv;

  constructor(text: string) {
    this.text = text;
    this.algorithm = process.env.ENC_ALG;
    this.key = process.env.ENC_KEY;
    this.iv = process.env.ENC_IV;
  }

  encrypt() {
    let cipher;

    if (!this.text) return null;
    if (this.algorithm && this.key && this.iv) {
      cipher = createCipheriv(this.algorithm, this.key, this.iv);
      let encrypted = cipher.update(this.text, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    }
  }

  decrypt() {
    let decipher;

    if (!this.text) return null;
    if (this.algorithm && this.key && this.iv) {
      decipher = createDecipheriv(this.algorithm, this.key, this.iv);
      let decrypted = decipher.update(this.text, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    }
  }
}

export default EncryptText;
