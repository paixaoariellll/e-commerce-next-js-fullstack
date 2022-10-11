import { getSession } from 'next-auth/react';
import Order from '../../../../../models/Order';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
        return res.status(401).send('Erro: É necessário estar acessado em sua conta para realizar essa função!');
    }
    await db.connect();
    const order = await Order.findById(req.query.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const deliveredOrder = await order.save();
        await db.disconnect();
        res.send({
            message: 'Produto entrege com sucesso!',
            order: deliveredOrder,
        });
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'Erro: produto não encontrado.' });
    }
};

export default handler;