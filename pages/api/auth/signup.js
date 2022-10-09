import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }
    const { name, lastName, email, password } = req.body;
    if (
        !name ||
        !lastName ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 5
    ) {
        res.status(422).json({
            message: 'Erro de validação!',
        });
        return;
    }

    await db.connect();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(422).json({ message: 'O usuário já existe!' });
        await db.disconnect();
        return;
    }

    const newUser = new User({
        name,
        lastName,
        email,
        password: bcryptjs.hashSync(password),
        isAdmin: false,
    });

    const user = await newUser.save();
    await db.disconnect();
    res.status(201).send({
        message: 'Usuário criado com sucesso!',
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
    });
}

export default handler;