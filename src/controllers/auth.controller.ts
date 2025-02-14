import db from "../database/database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = db.users;

export const register = async (req, res) => {
    try {
        const body = req.body;
        let data = User.build();

        data.name = body.name;
        data.email = body.email;
        data.password = await bcrypt .hash(body.password, 10);
        data.role = 'admin';
        // Implement registration logic
        const userRes = await User.create(data);
        delete userRes.dataValues.password;

        const token = jwt.sign({ user: userRes.dataValues, expiresIn:'1h'}, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ data: data });
    } catch (error) {
        res.send(error);
    }
}