import { getSession } from 'next-auth/react'
import Product from '../../../../models/Product'
import db from '../../../../utils/db'

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session || !session.user.isAdmin) {
        return res.status(401).send('É necessário estar cadastrado para efetuar essa ação.')
    }
    const { user } = session
    if (req.method === 'GET') {
        return getHandler(req, res)
    } else if (req.method === 'POST') {
        return postHandler(req, res)
    } else {
        return res.status(400).send({ message: 'Método não permitido' })
    }
}
// Creating a new product
const postHandler = async (req, res) => {
    await db.connect()
    const newProduct = new Product({
        name: 'simples nome',
        slug: 'simples-nome-' + Math.random(),
        image: '/img/game.jpg',
        price: 0,
        category: 'Xbox',
        publisher: 'simples distribuidora',
        countInStock: 0,
        description: 'Produto gerado pela post Handler feita por Ariel Paixão',
        rating: 0,
        numReviews: 0,
    })
    const product = await newProduct.save()
    await db.disconnect()
    res.send({ message: 'Produto criado com Sucesso!', product })
}

const getHandler = async (req, res) => {
    await db.connect()
    const products = await Product.find({})
    await db.disconnect()
    res.send(products)
}
export default handler
