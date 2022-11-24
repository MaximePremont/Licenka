import Image from "next/image";
import DefaultLayout from "../modules/layout";
import MainButton from "../components/MainButton";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Web3js = require("web3");

const ApprovePage = () => {
  const [contract, setContract] = useState(null);
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState(undefined);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const router = useRouter();
  let abi = process.env.CONTRACT_ABI;
  let contractAddress = process.env.LICENKA_ADDRESS;

  useEffect(() => {
    window.ethereum
      ? window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
          let web3_;
          let contract_ = contract;
          if (!contract_) {
            web3_ = new Web3js(window.ethereum);
            contract_ = new web3_.eth.Contract(abi, contractAddress);
            setContract(contract_);
          }
          contract_.methods
            .passwordMatch(window.ethereum.selectedAddress, 0)
            .call()
            .then((res) => {
              setIsPasswordSet(!res);
            });
        })
      : console.log("Please install MetaMask");
    if (router.query.id && contract) {
      contract.methods
        .licenses(router.query.id)
        .call({ from: window.ethereum.selectedAddress })
        .then((res) => {
          setLicense({
            name: res.name,
            price: Web3js.utils.fromWei(res.price, "ether"),
            duration: res.duration,
          });
          console.log(license.name);
        })
        .catch((err) => console.log(err));
    }
  }, [contract, router.query.id]);

  function handleClick() {
    contract.methods
      .passwordSet(Web3js.utils.keccak256(password))
      .send({ from: window.ethereum.selectedAddress })
      .catch((err) => console.log(err));
    setIsPasswordSet(true);
    setPassword("");
  }

  return (
    <div className="space-l-2">
      <section
        className="flex items-center justify-between pt-10"
        style={{ height: "65vh" }}
      >
        <div className="ml-32 w-3/5 container flex flex-col">
          {license ? (
            <h1>
              Get a <span className="text-primary">{license.name}</span>{" "}
              license, for <span className="text-primary">{license.price}</span>{" "}
              BUSD,&nbsp;
              <span className="text-primary">
                {!license.duration ? "forever" : license.duration + " day(s)"}
              </span>
              .
            </h1>
          ) : (
            <h1>No licenses found with this id</h1>
          )}
          <p className="text-2xl mt-4">
            By clicking on “get license” you agree to have transaction between
            you and the license&#39; provider
          </p>
        </div>
        <div>
          <Image src="/joker.svg" width={570} height={800} alt="logo" />
        </div>
      </section>
      <section className="mx-32 py-4" style={{ height: "20vh" }}>
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
            ></MainButton>
          </div>
        </div>
      </section>
    </div>
  );
};

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage;
