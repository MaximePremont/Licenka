const dotenv = require('dotenv')
dotenv.config();
const crypto = require('crypto');
const { connectToDatabase } = require('../../../lib/mongodb');

async function nonce(req, res) {
    let { db } = await connectToDatabase()
    let nonce = crypto.randomBytes(16).toString('base64');

    const users = db.collection("users");
    const result = await users.insertOne({ walletAddress: req.query.walletAddress, nonce: nonce});
    console.log(result);
    res.status(200).json({ walletAddress: req.query.walletAddress, nonce: nonce});
}

export default function handler(req, res) {
    console.log(req.method);
    if (req.method === 'GET') {
        if (!req.query.walletAddress) {
            res.status(400).json({ error: 'Missing walletAddress' });
            return;
        }
        nonce(req, res);
        return;
    }
    res.status(404).json({ message: 'Unknown route' })
}