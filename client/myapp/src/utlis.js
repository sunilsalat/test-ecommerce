const crypt = require("crypto");
// const algo = process.env.ENCRYPTION_ALGORITHM;
// const key = process.env.ENCRYPTION_KEY;

const secret_key = "asdfj";
const secret_iv = "smlt";

const key = crypt
  .createHash("sha256")
  .update(secret_key, "utf-8", "base64")
  .digest("hex");
const iv = crypt
  .createHash("sha256")
  .update(secret_iv, "utf-8", "base64")
  .digest("hex");

class EncryptionHandler {
  encrypt(data) {
    try {
      let mykey = crypt.createCipheriv(
        "AES-256-CBC",
        key.substring(0, 32),
        iv.substring(0, 16)
      );
      let mystr = mykey.update(data, "utf8", "hex");
      mystr += mykey.final("hex");
      return {
        status: 200,
        data: mystr,
      };
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }

  decrypt(data) {
    try {
      const dcypher = crypt.createDecipheriv(
        "AES-256-CBC",
        key.substring(0, 32),
        iv.substring(0, 16)
      );
      var decrypted_data =
        dcypher.update(data.trim(), "hex", "utf8") + dcypher.final("utf8");

      return {
        status: 200,
        data: decrypted_data,
      };
    } catch (error) {
      return {
        status: 500,
        error: error,
      };
    }
  }
}

const t = new EncryptionHandler();

console.log(t.encrypt("sec_value"));
console.log(t.decrypt("d8c185878bfdcc5f111bab289f2689b5"));

module.exports = EncryptionHandler;
