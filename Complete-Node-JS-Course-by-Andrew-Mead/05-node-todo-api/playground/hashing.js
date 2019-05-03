/***********************************************
 * HASHING MANUALLY WITH CRYPTO-JS
 */
//var {SHA256} = require('crypto-js');

// //quick test:
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log(message, hash);


// //creating data object
// var data = {
//     id: 4
// };

// //creating token by adding the data and the hash with a salting ('somesecret')
// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// //creating an other variable with the same hash method and salt
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// //check if the two hashes are equal
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed, don\'t trust');
// }


/***********************************************
 * HASHING WITH JWT (JSON Web Token)
 */
// var jwt = require('jsonwebtoken');

// var data = {
//     id: 10
// };

// //.sign() will create the hash and the whole token using the 'salt' we added
// var token = jwt.sign(data, '123abc');
// console.log(token);

// //.verify() can verify the token using the 'salt' we added
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);


/***********************************************
 * HASHING WITH BCRYPT
 */
var bcrypt = require('bcryptjs');

var password = '123abc!';

// //create a hash by adding generated salt
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$kvKO.uHpXCQvpGSmKlzhsuiAmtLzJOBKOC2OT3qLwI9kmyGb6T8oa';

// //compare the password to the hashed one
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});