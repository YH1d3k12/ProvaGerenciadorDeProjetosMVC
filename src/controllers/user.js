const User = require('../models/user');
const DataEncrypter = require('../utils/encrypter.js');
const encrypter = new DataEncrypter();

class UserController {
    async Login(req, res) {
        try {
            const { email, password } = req.body;

            const { dataValues: user } = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!email || !password) {
                return res.status(401).json({ message: "Email ou senha inválido" })
            }

            if (!user) {
                return res.status(401).json({ message: "Email ou senha inválido" })
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Email ou senha inválido" })
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, name: user.name },
                config.secret,
            )
            return res.status(200).json({ accessToken: token });
        }
        catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    };

    async GetUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ data: users });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

    async GetUserById(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ data: user });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

    async CreateUser(req, res) {
        try {
            const hashedPassword = await encrypter.HashPassword(req.body.password);

            const data = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }

            const result = await User.create(data);

            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

    async UpdateUser(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const result = await User.update(data, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ result: result, message: "User updated successfully" });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

    async DeleteUser(req, res) {
        try {
            if (!req.params.id) {
                return res.status(400).json({ message: "Id is missing" });
            }

            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const result = await User.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ result: result, message: "User deleted successfully" });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };
};

module.exports = UserController;
