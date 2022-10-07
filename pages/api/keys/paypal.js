import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).send('É necessário estar acessado em sua conta para realizar essa função!')
    }
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
}
export default handler
