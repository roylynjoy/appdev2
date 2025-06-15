const bcrypt = require("bcrypt");

const hashing = (value, saltValue) => {
    return bcrypt.hash(value, saltValue);
};

const hashValidation = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hashing,
    hashValidation,
};