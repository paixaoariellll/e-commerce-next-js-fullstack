import User from "../../../models/User"
import data from "../../../utils/data"
import db from "../../../utils/db"
import Product from '../../../models/Product';
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
    const session = await getSession({ req })
    console.log(session)
    if (!session || (session && !session.user.isAdmin)) {
        return (
            res.status(401).send('Erro: É necessário estar acessado em sua conta para realizar essa função!')
        )
    }

    await db.connect()
    await User.deleteMany()
    await User.insertMany(data.users)
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect()
    res.send({ message: 'Seed concluída com sucesso!' })
}

export default handler