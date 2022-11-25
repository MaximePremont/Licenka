const dotenv = require('dotenv')
dotenv.config()

const Web3js = require("web3");
const axios = require("axios")

const axiosInstance = axios.create({
	baseURL: "https://api.starton.io",
	headers: {
		"x-api-key": process.env.API_KEY,
	},
})

async function getCheckLicense(req, res) {
    axiosInstance.post(
        "/v3/smart-contract/binance-testnet/0x1aE04F30E59f1c38E72E12bd2bD94e7434E218f8/read",
        {
            functionName: "verifySubscriptionWeb2",
            params: [
                req.query.userAddress,
                Web3js.utils.keccak256(req.query.userPassword),
                req.query.licenseId
            ]
        }
    ).then((response) => {
        console.log(response.data.response)
        res.status(200).json({ license: response.data.response })
    }).catch(() => {
        res.status(400).json({ error: "password not set / wrong password" })
    })
}

export default function handler(req, res) {
    console.log(req.method)
    if (req.method === 'GET') {
        if (!req.query.userAddress) {
            res.status(400).json({ error: 'Missing userAddress' })
            return
        }
        if (!req.query.userPassword) {
            res.status(400).json({ error: 'Missing userPassword' })
            return
        }
        if (!req.query.licenseId) {
            res.status(400).json({ error: 'Missing licenseId' })
            return
        }
        getCheckLicense(req, res)
        return
    }
    res.status(404).json({ message: 'Unknown route' })
}