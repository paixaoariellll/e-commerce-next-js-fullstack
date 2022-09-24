import mongoose from "mongoose"

const connection = {}

async function connect() {
    if (connection.isConnected) {
        console.log("Está conectado!")
        return
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState
        if (connection.isConnected === 1) {
            console.log("Ainda está conectado")
            return
        }
        await mongoose.disconnect()
    }
    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log("nova conexão")
    connection.isConnected = mongoose.connections[0].readyState
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect()
            connection.isConnected = false
        } else {
            console.log("Ainda não desconectou")
        }
    }
}

const db = { connect, disconnect }
export default db