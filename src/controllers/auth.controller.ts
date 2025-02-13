import db from "../database/database";
import bcrypt from 'bcrypt';

const User = db.users;

export const register = async (req, res) => {
    try {
        const body = req.body;
        let data = User.build();

        data.email = 'body.email';
        data.password = await bcrypt .hash('body.password', 10);
        data.role = 'admin';
        console.log("data is :",data);
        // Implement registration logic
        // const userRes = await UserModel.create(data);
        res.status(201).json({ data: data });
    } catch (error) {
        res.send(error);
    }
}