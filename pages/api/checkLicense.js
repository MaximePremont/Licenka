const dotenv = require('dotenv')
dotenv.config()

const axios = require("axios")

const axiosInstance = axios.create({
	baseURL: "https://api.starton.io",
	headers: {
		"x-api-key": process.env.API_KEY,
	},
})

async function getCheckLicense(req, res) {
    axiosInstance.post(
        "/v3/smart-contract/binance-testnet/0x039CF1B6c8152fec9cb5afbf84220EEC74c0A527/read",
        {
            functionName: "verifySubscriptionWeb2",
            params: [
                req.query.userAddress,
                req.query.userPassword,
                req.query.licenseId
            ]
        }
    ).then((response) => {
        console.log(response.data.response)
        res.status(200).json({ license: response.data.response })
    }).catch(() => {
        res.status(400).json({ error: "password not set" })
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