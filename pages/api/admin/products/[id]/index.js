import { getSession } from 'next-auth/react'
import Product from '../../../../../models/Product'
import db from '../../../../../utils/db'

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
        return res.status(401).send('É necessário que você esteja acessado em sua conta!')
    }

    const { user } = session;
    if (req.method === 'GET') {
        return getHandler(req, res, user)
    } else if (req.method === 'PUT') {
        return putHandler(req, res, user)
    } else {
        return res.status(400).send({ message: 'Método não permitido' })
    }
}
const getHandler = async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    await db.disconnect()
    res.send(product)
}
const putHandler = async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    if (product) {
        product.name = req.body.name;
        product.slug = req.body.slug;
        product.price = req.body.price;
        product.category = req.body.category;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        await product.save()
        await db.disconnect()
        res.send({ message: 'Produto atualizado com sucesso' })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'Produto não encontrado!' })
    }
}
export default handler