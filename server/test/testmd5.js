var crypto = require('crypto');
var cryptmd5 = require('../util/cryptmd5');
var md5 = crypto.createHash('md5');
//$2y$10$3//zdlJDkZ5C.loMoR/qKe34xa8r1y7.0IIO.K.UPDzF0bPn6NVwG
//$2y$10$qY0X1S3C2RxSACe.KG41surBoL1XdUJXNekmGq7jZqr...
//$2y$10$d2i1FAEs5UnJirlnKKqiBugUj.WeLavY/UYa08uzU.l...
var pwd = md5.update('welcome1').digest();
console.log(new Buffer(pwd,'binary').toString('base64'));

console.log(cryptmd5.cryptMD5('welcome1','erXgIjX7'));


