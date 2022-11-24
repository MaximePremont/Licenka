const dotenv = require('dotenv')
dotenv.config()

const axios = require("axios")

const axiosInstance = axios.create({
	baseURL: "https://api.starton.io",
	headers: {
		"x-api-key": process.env.API_KEY,
	},
})

async function getLicense(req, res) {
    axiosInstance.post(
        "/v3/smart-contract/binance-testnet/0x039CF1B6c8152fec9cb5afbf84220EEC74c0A527/read",
        {
            functionName: "getSubscriptionIdForLicense",
            params: [
                req.query.userAddress,
                req.query.licenseId
            ]
        }
    ).then((response) => {
        axiosInstance.post(
            "/v3/smart-contract/binance-testnet/0x039CF1B6c8152fec9cb5afbf84220EEC74c0A527/read",
            {
                functionName: "subscriptions",
                params: [
                    response.data.response
                ]
            }
        ).then((response) => {
            let keys = ['licenseId', 'validTime', 'isInfinite']
            let i = 0;
            res.status(200).json({ license: response.data.response.reduce((a, v) => ({ ...a, [keys[i++]]: v}), {}) })
        }).catch(() => {
            res.status(400).json({ error: "err" })
        })
    }).catch(() => {
        res.status(400).json({ error: "err" })
    })
}

export default function handler(req, res) {
    console.log(req.method)
    if (req.method === 'GET') {
        if (!req.query.userAddress) {
            res.status(400).json({ error: 'Missing userAddress' })
            return
        }
        if (!req.query.licenseId) {
            res.status(400).json({ error: 'Missing licenseId' })
            return
        }
        getLicense(req, res)
        return
    }
    res.status(404).json({ message: 'Unknown route' })
}