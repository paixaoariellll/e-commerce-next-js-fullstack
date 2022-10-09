import { getSession } from 'next-auth/react'
import Product from '../../../../models/Product'
import db from '../../../../utils/db'

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session || !session.user.isAdmin) {
        return res.status(401).send('É necessário que você esteja acessado em sua conta!')
    }
    // const { user } = session;
    if (req.method === 'GET') {
        return getHandler(req, res)
    } else {
        return res.status(400).send({ message: 'Método não permitido' })
    }
}

const getHandler = async (req, res) => {
    await db.connect()
    const products = await Product.find({})
    await db.disconnect()
    res.send(products)
}
export default handler
