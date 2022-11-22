import Web3 from "web3"

const CONTRACT_JSON = []
const DAI_ADDRESS = ""

async function getLicense(req, res) {
    const web3 = new Web3("http://localhost:8545")
    const daiToken = new web3.eth.Contract(CONTRACT_JSON, DAI_ADDRESS)
    daiToken.methods.getLicense(req.query.userAddress).call(function (err, res) {
        if (err) {
            res.status(404).json({ error: err })
        }
        res.status(200).json({ license: res })
        return 
    })
}

export default function handler(req, res) {
    console.log(req.method)
    if (req.method === 'GET') {
        if (!req.query.userAddress) {
            res.status(400).json({ error: 'Missing userAddress' })
            return
        }
        getLicense(req, res)
        return
    }
    res.status(404).json({ message: 'Unknown route' })
}
