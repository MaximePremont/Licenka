const dotenv = require('dotenv')
dotenv.config()

const { connectToDatabase } = require('../../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

async function nonce(req, res) {
    let { db } = await connectToDatabase()
    res.status(200).json({ walletAddress: req.query.walletAddress})
}

export default function handler(req, res) {
    console.log(req.method)
    if (req.method === 'GET') {
        if (!req.query.walletAddress) {
            res.status(400).json({ error: 'Missing walletAddress' })
            return
        }
        nonce(req, res)
        return
    }
    res.status(404).json({ message: 'Unknown route' })
}