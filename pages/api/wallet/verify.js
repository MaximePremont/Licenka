const dotenv = require('dotenv');
dotenv.config();
import { ethers } from "ethers";
const { connectToDatabase } = require('../../../lib/mongodb');
const axios = require("axios")

const axiosInstance = axios.create({
    baseURL: "https://api.starton.io",
    headers: {
        "x-api-key": process.env.API_KEY,
    },
})

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

    //TODO: Check the timestamp

    axiosInstance.post(
        "/v3/smart-contract/binance-testnet/0x150B6328F1810589aF899f6d9F17E0347f77c8b8/read",
        {
            functionName: "verifySubscription",
            params: [
                req.query.userAddress,
                req.query.licenseId
            ]
        }
    ).then((response) => {
        console.log(response.data.response)
        res.status(200).json({ verified: "true" })
    }).catch(() => {
        res.status(400).json({ error: "User has no license" })
    })
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
        if (!req.query.licenseId) {
            res.status(400).json({ error: 'Missing licenseId' })
            return
        }
        verify(req, res)
        return
    }
    res.status(404).json({ message: 'Unknown route' })
}