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
        "/v3/smart-contract/binance-testnet/0x150B6328F1810589aF899f6d9F17E0347f77c8b8/read",
        {
            functionName: "licenses(uint256)",
            params: [
                req.query.licenseId
            ]
        }
    ).then((response) => {
        let keys = ['owner', 'name', 'price', 'duration']
        let i = 0;
        res.status(200).json({ ...response.data.response.reduce((a, v) => ({ ...a, [keys[i++]]: v}), {}) })
    }).catch(() => {
        res.status(400).json({ error: "err" })
    })
}

export default function handler(req, res) {
    console.log(req.method)
    if (req.method === 'GET') {
        if (!req.query.licenseId) {
            res.status(400).json({ error: 'Missing licenseId' })
            return
        }
        getLicense(req, res)
        return
    }
    res.status(404).json({ message: 'Unknown route' })
}