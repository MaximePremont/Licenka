import Image from "next/image";
import DefaultLayout from "../modules/layout";
import MainButton from "../components/MainButton";
import { ToastContainer, toast } from "react-toastify";

import React, { useState, useEffect } from "react";

const Web3js = require("web3");

const CreatePage = () => {
  const [contract, setContract] = useState(null);
  const [waitingTrans, setWaitingTrans] = useState(false);
  const [isForever, setForever] = useState(true);
  const [licenseId, setLicenseId] = useState(undefined);

  let abi = process.env.LICENKA_CONTRACT_ABI;
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
        })
      : console.log("Please install MetaMask");
  }, [isForever]);

  const submitCreate = async (event) => {
    event.preventDefault();
    let formatedDuration = 0;
    let name = event.target.name.value;
    let wallet = event.target.wallet.value;
    let formatedPrice = Web3js.utils.toWei(event.target.price.value, "ether");

    if (event.target.validity.value === "limited")
      formatedDuration = event.target.validityTiming.value * 24 * 60 * 60;
    setWaitingTrans(true);
    contract.methods
      .createLicense(wallet, name, formatedPrice, formatedDuration)
      .send({ from: window.ethereum.selectedAddress })
      .then((info) => {
        setLicenseId(info.events.LicenseCreate.returnValues.licenseId);
        setWaitingTrans(false);
        toast.success("License created !", {
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
      .catch((err) => {
        setWaitingTrans(false);
        console.log(err);
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
  };

  const setTiming = () => {
    setForever(!isForever);
  };

  return (
    <div>
      <section className="flex">
        <div className="ml-32 mt-32 w-3/5 container flex flex-col space-y-8">
          <h1>
            Create <span className="text-primary">your </span> license, the way{" "}
            <span className="text-primary">you</span> want it
          </h1>
          <form onSubmit={submitCreate}>
            <div className="w-4/5 container flex flex-col space-y-8">
              <input
                type="text"
                id="name"
                className="bg-background border border-gray-300 rounded-lg  p-2.5 h-16 w-3/4"
                placeholder="License name"
                required
              />
              <input
                type="text"
                id="wallet"
                pattern="0x[0-9a-fA-F]{40}"
                className="bg-background border border-gray-300 rounded-lg  p-2.5 h-16 w-3/4"
                placeholder="Wallet address"
                required
              />
              <input
                type="number"
                min="0"
                step={0.01}
                max="999999999"
                pattern="[0-9]+{0,9}"
                id="price"
                className="bg-background border border-gray-300 rounded-lg  p-2.5 h-16 w-3/4"
                placeholder="Price in BUSD"
                required
              />
              <ul className="flex w-3/4 justify-between">
                <li className="relative">
                  <input
                    className="sr-only peer"
                    type="radio"
                    value="forever"
                    name="validity"
                    id="answer_forever"
                    defaultChecked
                    onChange={setTiming}
                    required
                  />
                  <label
                    className="flex p-5 bg-background border border-gray-300 rounded-lg cursor-pointer focus:outline-none peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
                    htmlFor="answer_forever"
                  >
                    Forever
                  </label>
                </li>
                <li className="relative">
                  <input
                    className="sr-only peer"
                    type="radio"
                    value="limited"
                    name="validity"
                    id="answer_limited"
                    onChange={setTiming}
                  />
                  <label
                    className="flex p-5 bg-background border border-gray-300 rounded-lg cursor-pointer focus:outline-none peer-checked:ring-red-500 peer-checked:ring-2 peer-checked:border-transparent"
                    htmlFor="answer_limited"
                  >
                    Limited
                  </label>
                </li>
                <input
                  id="validityTiming"
                  type="number"
                  inputMode="numeric"
                  placeholder="Validity in days"
                  pattern="[0-9]*"
                  defaultValue="30"
                  min={1}
                  disabled={isForever}
                  className="bg-background border border-gray-300 rounded-lg disabled:border-gray-800 disabled:text-gray-800  p-2.5 h-16"
                ></input>
              </ul>
              <div className="flex w-3/4 justify-between items-center">
                <MainButton
                  type="submit"
                  label={!waitingTrans ? "Create" : "Loading..."}
                  iconSrc={"/add_icon.svg"}
                ></MainButton>
                {licenseId ? (
                  <h1 className="text-2xl text-center">
                    Your license has the id number:
                    <br /> <h1 className="text-5xl">{licenseId}</h1>
                  </h1>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </form>
        </div>
        <Image src="/shine.svg" width={475} height={483} alt="logo" />
      </section>
      <section className="mx-32 py-4"></section>
      <section className="flex">
        <div className="ml-32 mt-32 w-3/5 container flex flex-col space-y-4">
          <h1>
            <span className="text-primary">How </span> to create a license ? 🪄
          </h1>
          <div className="ml-8">
            <p>
              <span className="text-primary">1. </span>Choose a name to give to
              your product’s license.
            </p>
            <p>
              <span className="text-primary">2. </span>Enter the wallet’s
              address to which the money will be send.
            </p>
            <p>
              <span className="text-primary">3. </span>Select the price of your
              license (can be free).
            </p>
            <p>
              <span className="text-primary">4. </span>Choose how long is your
              license valid
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="ml-32 mt-32 w-1/2 container flex flex-col space-y-4">
          <h1>
            And <span className="text-primary">tada </span> your license has
            been created 🎩
          </h1>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

CreatePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default CreatePage;
