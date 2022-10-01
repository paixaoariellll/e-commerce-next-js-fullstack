import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Ariel',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Milena',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
}

export default data