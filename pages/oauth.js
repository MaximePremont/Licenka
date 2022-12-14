import Image from "next/image";
import DefaultLayout from "../modules/layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Web3js = require("web3");

const OauthPage = () => {
  const [licenkaContract, setLicenkaContract] = useState(null);
  const [license, setLicense] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [signedCalled, setSignedCalled] = useState(false);
  const router = useRouter();
  const { redirect_uri, license_id } = router.query;
  const redirect_uri_error = `${redirect_uri}?error=invalid_request`;

  let licenkaAbi = process.env.LICENKA_CONTRACT_ABI;
  let licenkaAddress = process.env.LICENKA_ADDRESS;

  async function fetchLicense() {
    try {
      let res = await fetch("/api/getLicense?licenseId=" + license_id)
      res = await res.json();
      if (!res.name) throw("License not found")
      setLicense({ id: license_id, name: res.name, price: res.price, duration: res.duration });
      handleGetLicense();
    } catch (err){
        console.log(err);
        window.location.replace(redirect_uri_error);
    }
  }

  useEffect(() => {
    if (signedCalled == true)
      fetchLicense()
  }, [signedCalled]);

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
      })
      : console.log("Please install MetaMask");
    if (license_id && licenkaContract && !signedCalled) {
      setSignedCalled(true)
    }
  }, [licenkaContract, license_id]);


  function handleGetLicense() {
    web3.eth.getAccounts().then((accounts) => {
      fetch("/api/wallet/nonce?walletAddress=" + accounts[0]).then(async (res) => {
        const data = await res.json();
        const nonce = data.nonce;
        web3.eth.personal.sign(nonce, accounts[0]).then((signature) => {
          window.location.replace(`${redirect_uri}?nonce_signed=${signature}&address=${accounts[0]}`);
        }).catch((err) => {
          console.log(err);
          window.location.replace(redirect_uri_error);
        });
      }).catch((err) => {
        console.log(err);
        window.location.replace(redirect_uri_error);
      });
    }).catch((err) => {
      console.log(err);
      window.location.replace(redirect_uri_error);
    });
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
              Authenticate yourself for <span className="text-primary">{license.name}</span>{" "}
              license, valid for&nbsp;
              <span className="text-primary">
                {license.duration == 0 ? "forever" : license.duration / 86400 + " day(s)"}
              </span>
              .
            </h1>
          ) : (
            <h1>No licenses found with this id</h1>
          )}
        </div>
        <div>
          <Image src="/joker.svg" width={570} height={800} alt="logo" />
        </div>
      </section>
      <section className="mx-32 py-4" style={{ height: "20vh" }}>
      </section>
    </div>
  );
};

OauthPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default OauthPage;
