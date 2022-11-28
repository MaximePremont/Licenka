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
        res.status(200).json({ license: response.data.response })
    }).catch(() => {
        res.status(400).json({ error: "error" })
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
        getCheckLicense(req, res)
        return
    }
    res.status(404).json({ message: 'Unknown route' })
}