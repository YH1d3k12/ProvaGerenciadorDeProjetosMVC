const bcrypt = require('bcrypt');

class DataEncrypter {
    async HashPassword(password) {
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return hashedPassword;
    };
};

module.exports = DataEncrypter;
