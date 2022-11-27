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
            licenkaContract_ = new web3_.eth.Contract(
              licenkaAbi,
              licenkaAddress
            );
            setLicenkaContract(licenkaContract_);
          }
        })
      : console.log("Please install MetaMask");
    if (router.query.id && licenkaContract) {
      licenkaContract.methods
        .licenses(router.query.id)
        .call({ from: window.ethereum.selectedAddress })
        .then((res) => {
          if (res.name) {
            setLicense({
              id: router.query.id,
              name: res.name,
              price: res.price,
              duration: res.duration,
            });
          } else {
            setInvalidId(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [licenkaContract, router.query.id]);

  async function handleGetLicense() {
    var BN = web3.utils.BN;
    let price = license.price;
    let licenseId = license.id;
    let tokenAddress = await licenkaContract.methods
      .token()
      .call({ from: window.ethereum.selectedAddress });
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
                  setWaitingTrans(false);
                  if (router.query.redirect)
                    window.location.href = router.query.redirect;
                })
                .catch((err) => {
                  throw err;
                });
            })
            .catch(() => {
              setWaitingTrans(false);
              toast.error("Something wrong happened", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
        } else {
          licenkaContract.methods
            .subscribe(licenseId)
            .send({ from: window.ethereum.selectedAddress })
            .then(() => {
              toast.success("License purchased !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            })
            .catch(() => {
              setWaitingTrans(false);
              toast.error("Something wrong happened", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setWaitingTrans(false);
      });
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
              license, for{" "}
              <span className="text-primary">
                {Web3js.utils.fromWei(license.price, "ether")}
              </span>{" "}
              BUSD,&nbsp;
              <span className="text-primary">
                {license.duration == 0
                  ? "forever"
                  : license.duration / 86400 + " day(s)"}
              </span>
              .
            </h1>
          ) : isInvalidId ? (
            <h1>Sorry there is no license existing with this id</h1>
          ) : (
            <h1>Fetching license's information...</h1>
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
              label={!waitingTrans ? "Get license" : "Loading..."}
              iconSrc={"/add_icon.svg"}
              callback={handleGetLicense}
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
