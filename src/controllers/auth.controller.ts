import db from "../database/database";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';

const UserModel = db.users;

export const register = async (req, res) => {
    try {
        const body = req.body;
        let data : User;

        data.email = body.email;
        data.password = await bcrypt .hash(body.password, 10);
        data.role = 'admin';
        // Implement registration logic
        // const userRes = await UserModel.create(data);
        res.status(201).json({ data: data });
    } catch (error) {
        res.send(error);
    }
}