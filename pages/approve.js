import Image from "next/image";
import DefaultLayout from "../modules/layout";
import MainButton from "../components/MainButton";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useEffect } from "react";

const Web3js = require("web3");

const ApprovePage = () => {
  const [web3, setWeb3] = useState(null);
  const [waitingTrans, setWaitingTrans] = useState(false);
  const [licenkaContract, setLicenkaContract] = useState(null);
  const [license, setLicense] = useState(undefined);
  const [isInvalidId, setInvalidId] = useState(false);
  const [alreadyOwned, setAlreadyOwned] = useState(false);
  const router = useRouter();

  let licenkaAbi = process.env.LICENKA_CONTRACT_ABI;
  let licenkaAddress = process.env.LICENKA_ADDRESS;

  let ERC20Abi = process.env.BUSD_CONTRACT_ABI;

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" })
      let web3_;
      if (!licenkaContract) {
        web3_ = new Web3js(window.ethereum);
        setWeb3(web3_);
        setLicenkaContract(new web3_.eth.Contract(licenkaAbi, licenkaAddress));
      }
      if (router.query.id && licenkaContract) {
        fetch("/api/getLicense?licenseId=" + router.query.id)
        .then(async (res) => {
          res = await res.json();
          if (res.name) {
            setLicense({ id: router.query.id, name: res.name, price: res.price, duration: res.duration });
          } else {
            setInvalidId(true);
          }
        })
        .catch(() => setInvalidId(true));
        if (window.ethereum.selectedAddress) {
          fetch(`/api/checkLicense?licenseId=${router.query.id}&userAddress=${window.ethereum.selectedAddress}`)
          .then(async (res) => {
            res = await res.json();
            setAlreadyOwned(res.license)
          })
          .catch((err) => {
            console.log(err)
          })
        }
      }
    }
  }, [licenkaContract, router.query.id]);

  function transactionPopUp(message, isSuccess) {
    const funct = isSuccess ? toast.success : toast.error;
    funct(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  async function handleGetLicense() {
    setWaitingTrans(true);
    let price = license.price;
    let licenseId = license.id;
    let tokenAddress = await licenkaContract.methods.token().call({from: 0});
    let tokenContract = new web3.eth.Contract(ERC20Abi, tokenAddress);
    setWaitingTrans(true);
    try {
      const approved = await tokenContract.methods.allowance(window.ethereum.selectedAddress, licenkaAddress).call({ from: 0 })
      if (new web3.utils.BN(approved).lt(new web3.utils.BN(price)))
        await tokenContract.methods.approve(licenkaAddress, price).send({ from: window.ethereum.selectedAddress })

      await licenkaContract.methods.subscribe(licenseId).send({ from: window.ethereum.selectedAddress })
      transactionPopUp("License purchased !", true)
      if (router.query.redirect)
        window.location.replace(router.query.redirect);
    } catch (err) {
      transactionPopUp("Something wrong happened", false)
      console.log(err)
    }
    setWaitingTrans(false);
  }

  return (
    <div className="space-l-2">
      <section
        className="flex items-center justify-between pt-10"
        style={{ height: "65vh" }}
      >
        <div className="ml-32 w-3/5 container flex flex-col">
          {license && !isInvalidId ? (
            <h1>
              Get a <span className="text-primary">{license.name}</span>{" "}
              license for{" "}
              <span className="text-primary">
                {license.price == 0 ? "Free" : Web3js.utils.fromWei(license.price, "ether")}
              </span>
              {license.price == 0 ? "" : " BUSD"}, &nbsp;
              <span className="text-primary">
                {license.duration == 0
                  ? "forever"
                  : license.duration / 86400 + " day(s)"}
              </span>
              .
            </h1>
          ) : isInvalidId ? (
            <h1>Sorry there is no license with this id (yet)</h1>
          ) : (
            <h1>Fetching license&#39;s information...</h1>
          )}
        </div>
        <div>
          <Image src="/joker.svg" width={570} height={800} alt="logo" />
        </div>
      </section>
      {!isInvalidId ? (
        <section className="mx-32 py-4 w-3/5 space-y-4">
          <p className="text-lg w-2/5 mt-4">
            By clicking on “get license” you agree to have a transaction between
            you and the license&#39;s provider
          </p>
          <div className="flex">
            <MainButton
              label={alreadyOwned ? "Already owned" : (!waitingTrans ? "Get license" : "Loading...")}
              iconSrc={"/add_icon.svg"}
              callback={handleGetLicense}
              isDisabled={alreadyOwned}
            ></MainButton>
          </div>
        </section>
      ) : (
        <div className="h-6"></div>
      )}
      <ToastContainer />
    </div>
  );
};

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage;
