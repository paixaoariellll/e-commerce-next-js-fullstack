import moment from 'moment'
import { getSession } from 'next-auth/react'
import Order from '../../../../models/Order'
import db from '../../../../utils/db'

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).send('Erro: É necessário estar acessado em sua conta para realizar essa função!')
    }

    await db.connect()
    const order = await Order.findById(req.query.id)
    if (order) {
        if (order.isPaid) {
            return res.status(400).send({ message: 'Erro: O pedido já foi pago!' })
        }
        order.isPaid = true
        order.paidAt = moment().format()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.email_address,
        }
        const paidOrder = await order.save()
        await db.disconnect()
        res.send({ message: 'Pagamento realizado com sucesso!', order: paidOrder })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'Erro: Pedido não encontrado' })
    }
}

export default handler
