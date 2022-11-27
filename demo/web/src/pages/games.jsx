import React from 'react';
import Cookies from 'universal-cookie';
import {Navigate} from "react-router-dom";

function Home() {
    const cookies = new Cookies();
    console.log(cookies.get('nonce_signed'), cookies.get('address'))
    const nonce_signed = cookies.get('nonce_signed');
    const address = cookies.get('address');

    fetch("http://localhost:8080/verify", {
        method: "POST",
        mode: 'no-cors',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nonce_signed,
            address
        })
    }).then(res => {
        if (res.ok) {
            return (
                <h1 className="title">License verified</h1>
            );
        } else {
            return (
                <Navigate to="/login?warning=License%20unverified" />
            );
        }
    })
}

export default Home;