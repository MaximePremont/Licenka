import Image from "next/image";
import DefaultLayout from "../modules/layout";
import MainButton from "../components/MainButton";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Web3js = require("web3");

const ApprovePage = () => {
  const [web3, setWeb3] = useState(null);
  const [waitingTrans, setWaitingTrans] = useState(false);
  const [licenkaContract, setLicenkaContract] = useState(null);
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState(undefined);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const router = useRouter();

  let licenkaAbi = process.env.LICENKA_CONTRACT_ABI;
  let licenkaAddress = process.env.LICENKA_ADDRESS;

  let ERC20Abi = process.env.BUSD_CONTRACT_ABI;

  useEffect(() => {
    window.ethereum
      ? window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
          let web3_;
          let licenkaContract_ = licenkaContract;
          if (!licenkaContract_) {
            web3_ = new Web3js(window.ethereum);
            setWeb3(web3_);
            licenkaContract_ = new web3_.eth.Contract(licenkaAbi, licenkaAddress);
            setLicenkaContract(licenkaContract_);
          }
          licenkaContract_.methods
            .passwordMatch(window.ethereum.selectedAddress, 0)
            .call()
            .then((res) => {
              setIsPasswordSet(!res);
            });
        })
      : console.log("Please install MetaMask");
    if (router.query.id && licenkaContract) {
      licenkaContract.methods
        .licenses(router.query.id)
        .call({ from: window.ethereum.selectedAddress })
        .then((res) => {
          setLicense({
            id: router.query.id,
            name: res.name,
            price: res.price,
            duration: res.duration,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [licenkaContract, router.query.id]);

  function handleClick() {
    licenkaContract.methods
      .passwordSet(Web3js.utils.keccak256(password))
      .send({ from: window.ethereum.selectedAddress })
      .catch((err) => console.log(err));
    setIsPasswordSet(true);
    setPassword("");
  }

  async function handleGetLicense() {
    var BN = web3.utils.BN
    let price = license.price
    let licenseId = license.id
    let tokenAddress = await licenkaContract.methods.token().call({ from: window.ethereum.selectedAddress })
    let tokenContract = new web3.eth.Contract(ERC20Abi, tokenAddress);
    setWaitingTrans(true);
    tokenContract.methods
      .allowance(window.ethereum.selectedAddress, licenkaAddress)
      .call({ from: window.ethereum.selectedAddress })
      .then((res) => {
        // console.log(new BN(res), new BN(price), new BN(res).lt(new BN(price)))
        if (new BN(res).lt(new BN(price))) {
          tokenContract.methods
          .approve(licenkaAddress, price)
          .send({ from: window.ethereum.selectedAddress })
          .then(() => {
            licenkaContract.methods
            .subscribe(licenseId)
            .send({ from: window.ethereum.selectedAddress })
            .then(() => {
              setWaitingTrans(false)
            })
            .catch(err => { throw err })
          })
          .catch(() => {
            setWaitingTrans(false)
          })
        } else {
          licenkaContract.methods
          .subscribe(licenseId)
          .send({ from: window.ethereum.selectedAddress })
          .catch(() => {
            setWaitingTrans(false);
          })
        }
      })
      .catch((err) => {
        console.log(err)
        setWaitingTrans(false)
      })
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
              license, for <span className="text-primary">{Web3js.utils.fromWei(license.price, "ether")}</span>{" "}
              BUSD,&nbsp;
              <span className="text-primary">
                {license.duration == 0 ? "forever" : license.duration / 86400 + " day(s)"}
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
              label={(!waitingTrans) ? "Get license" : "Loading..."}
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
