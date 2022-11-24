import Image from "next/image";
import DefaultLayout from "../modules/layout";
import MainButton from "../components/MainButton";

import React, { useState, useEffect } from "react";
const Web3js = require("web3");

const ApprovePage = () => {
  const [licenkaContract, setLicenkaContract] = useState(null);
  const [busdContract, setBusdContract] = useState(null);
  const [password, setPassword] = useState("");
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  let licenkaAbi = process.env.LICENKA_CONTRACT_ABI;
  let licenkaAddress = process.env.LICENKA_ADDRESS;

  let busdAbi = process.env.BUSD_CONTRACT_ABI;
  let busdAddress = process.env.BUSD_ADDRESS;

  let license = {
    name: "minecraft",
    price: 19.99,
    time: -1,
  };

  useEffect(() => {
    window.ethereum
      ? window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
          let web3_;
          let licenkaContract_ = licenkaContract;
          if (!licenkaContract_) {
            web3_ = new Web3js(window.ethereum);
            licenkaContract_ = new web3_.eth.Contract(licenkaAbi, licenkaAddress);
            setLicenkaContract(licenkaContract_);
          }
          let busdContract_ = busdContract;
          if (!busdContract_) {
            web3_ = new Web3js(window.ethereum);
            busdContract_ = new web3_.eth.Contract(busdAbi, busdAddress);
            setBusdContract(busdContract_);
          }
          licenkaContract_.methods
            .passwordMatch(window.ethereum.selectedAddress, 0)
            .call()
            .then((res) => {
              setIsPasswordSet(!res);
            });
        })
      : console.log("Please install MetaMask");
  }, []);

  function handleClick() {
    licenkaContract.methods
      .passwordSet(Web3js.utils.keccak256(password))
      .send({ from: window.ethereum.selectedAddress })
      .catch((err) => console.log(err));
    setIsPasswordSet(true);
    setPassword("");
  }

  function handleGetLicense() {
    let price = "19990000000000000000"
    let licenseId = 1
    busdContract.methods
      .allowance(window.ethereum.selectedAddress, licenkaAddress)
      .call({ from: window.ethereum.selectedAddress })
      .then((res) => {
        console.log(res)
        if (res < price) {
          busdContract.methods
          .approve(licenkaAddress, price)
          .send({ from: window.ethereum.selectedAddress })
          .then(() => {
            licenkaContract.methods
            .subscribe(licenseId)
            .send({ from: window.ethereum.selectedAddress })
            .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
        } else {
          licenkaContract.methods
          .subscribe(licenseId)
          .send({ from: window.ethereum.selectedAddress })
          .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="space-l-2">
      <section className="flex items-center justify-between pt-10" style={{height: '65vh'}}>
        <div className="ml-32 w-3/5 container flex flex-col">
          <h1>
            Get a <span className="text-primary">{license.name}</span> license,
            for <span className="text-primary">{license.price}</span> BUSD,&nbsp;
            <span className="text-primary">
              {license.time == -1 ? "forever" : license.time}
            </span>
            .
          </h1>
          <p className="text-2xl mt-4">
            By clicking on “get license” you agree to have transaction between
            you and the license&#39; provider
          </p>
        </div>
        <div>
          <Image
            // className="w-2/5"
            src="/joker.svg"
            width={570}
            height={800}
            alt="logo"
            />
        </div>
      </section>
      <section className="mx-32 py-4" style={{height: '20vh'}}>
        <p className="py-4">Set a password to access your licenses:</p>
        <div className="flex justify-between">
          <div className="container items-center flex justify-between py-4">
            <input
              type="password"
              id="first_name"
              className="bg-background border border-gray-300 rounded-lg  p-2.5 w-1/2 mr-8 h-12"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MainButton
              label={isPasswordSet ? "Change password" : "Set Pasword"}
              callback={handleClick}
            ></MainButton>
          </div>
          <div className="container items-center flex justify-end py-4">
            <MainButton
              label="Get license"
              iconSrc={"/add_icon.svg"}
              callback={handleGetLicense}
              ></MainButton>
          </div>
        </div>
      </section>
    </div>
  );
};

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage;
