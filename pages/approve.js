import Image from "next/image";
import DefaultLayout from "../modules/layout";
import MainButton from "../components/MainButton";

import React, {useState, useEffect} from 'react';
const Web3js = require('web3');

const ApprovePage = () => {
  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null)
  const [password, setPassword] = useState("")
  const [isPasswordSet, setIsPasswordSet] = useState(false)

  let abi = process.env.CONTRACT_ABI
  let contractAddress = process.env.LICENKA_ADDRESS

  useEffect(() => {
    window.ethereum ? ethereum.request({ method: "eth_requestAccounts" }) : console.log("Please install MetaMask")
    let web3_
    let contract_ = contract
    if (!contract_) {
      web3_ = new Web3js(ethereum)
      setWeb3(web3_)
      contract_ = new web3_.eth.Contract(abi, contractAddress)
      setContract(contract_)
    }
    let isSet = contract_.methods.passwordMatch(window.ethereum.selectedAddress, 0).call().then((res) => {
      setIsPasswordSet(!res)
    })
  }, [])

  function handleClick() {
    contract.methods.passwordSet(Web3js.utils.keccak256(password)).send({from: window.ethereum.selectedAddress}).then((res) => {
      }).catch((err) => console.log(err))
    setIsPasswordSet(true)
    setPassword("")
  }

  return (
    <div className="space-l-2">
      <section className="flex">
        <div className="ml-32 mt-48 w-3/5 container flex flex-col space-y-4">
          <h1>
            Get <span className="text-primary">minecraft's</span> license
          </h1>
          <h1>
            for <span className="text-primary">19.99</span> BUSD,
          </h1>
          <h1>
            <span className="text-primary">forever</span>.
          </h1>
          <p>
            By clicking on “get license” you agree to have transaction between
            you and the license’s provider
          </p>
        </div>
        <Image
          className="w-2/5"
          src="/joker.svg"
          width={652}
          height={877}
          alt="logo"
        />
      </section>
      <section className="mx-32 py-4">
        <p className="py-4">Set a password to access your licenses:</p>
        <div className="flex justify-between">
          <div className="container items-center flex justify-between py-4">
            <input
              type="password"
              id="first_name"
              class="bg-background border border-gray-300 rounded-lg  p-2.5 w-1/2 mr-8 h-12"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <MainButton label={isPasswordSet? "Change password" : "Set Pasword"} callback={handleClick}></MainButton>
          </div>
          <div className="container items-center flex justify-end py-4">
            <MainButton label="Get license" iconSrc={"/add_icon.svg"}></MainButton>
          </div>
        </div>
      </section>
    </div>
  );
};

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage;
