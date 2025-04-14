const User = require('../models/user');

class UserController {
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
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
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

            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(result);
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

            const result = await User.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ data: result });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };
};

module.exports = UserController;
