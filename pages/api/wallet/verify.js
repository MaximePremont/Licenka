const dotenv = require('dotenv');
dotenv.config();
import { ethers } from "ethers";
const { connectToDatabase } = require('../../../lib/mongodb');


async function verify(req, res) {
    let { db } = await connectToDatabase();
    const users = db.collection("users");
    const nonce = await users.findOne({walletAddress: req.query.walletAddress});
    if (nonce == null) {
        res.status(500).json({error: 'walletAddress not register in database'})
    }
    const signerAddr = ethers.utils.verifyMessage("qsddqdqsd", "0x9c1e97ee80495239effd1a053a018994ced938f40f1584e103660b056a46d5915d4ce2cb7ca67f4e018cf1544602f7683200108ee6d743c10016e53ac8ed5eae1c");
    if (signerAddr !== req.query.walletAddress) {
        res.status(200).json({ verified: false });
        return
    }
    res.status(200).json({ verified: true });
}

export default function handler(req, res) {
    console.log(req.method)
    if (req.method === 'GET') {
        if (!req.query.walletAddress) {
            res.status(400).json({ error: 'Missing walletAddress' })
            return
        }
        if (!req.query.signedMessage) {
            res.status(400).json({ error: 'Missing signedMessage' })
            return
        }
        verify(req, res)
        return
    }
    res.status(404).json({ message: 'Unknown route' })
}