var CryptoJS = require("crypto-js");

// Encrypt
var message="Hello World";
var ciphertext = CryptoJS.AES.encrypt(message, 'secret key 123').toString();

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'