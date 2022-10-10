import User from '../../../../models/User'
import db from '../../../../utils/db'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session || !session.user.isAdmin) {
        return res.status(401).send('Erro: É necessário estar cadastrado para efetuar essa ação.')
    }

    if (req.method === 'DELETE') {
        return deleteHandler(req, res)
    } else {
        return res.status(400).send({ message: 'Erro: Método não permitido.' })
    }
}

const deleteHandler = async (req, res) => {
    await db.connect();
    const user = await User.findById(req.query.id)
    if (user) {
        if (user.email === 'admin@example.com') {
            return res.status(400).send({ message: 'Você não pode deletar o Administrador dessa página!' })
        }
        await user.remove()
        await db.disconnect()
        res.send({ message: 'Usuário deletado' })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'Usuário não encontrado' })
    }
}

export default handler
