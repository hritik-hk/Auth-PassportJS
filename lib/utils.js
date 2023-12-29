const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

function genPassword(password) {
  const salt = crypto.randomBytes(32);
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  
  return {
    salt: salt,
    hash: genHash
  };
}

function validPassword(password, hash, salt) {
  // Hash user-entered password using PBKDF2 with SHA-512, generating a Buffer
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return crypto.timingSafeEqual(hashedPassword, hash);
}

/**
 The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  const _id = user._id;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;