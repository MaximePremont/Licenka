import React from 'react';
import Cookies from 'universal-cookie';
import {Navigate} from "react-router-dom";

async function Games() {
    const cookies = new Cookies();
    console.log(cookies.get('nonce_signed'), cookies.get('address'))
    const nonce_signed = cookies.get('nonce_signed');
    const address = cookies.get('address');

    const res = await fetch("http://localhost:8080/verify", {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'same-origin',
        body: JSON.stringify({
            nonce_signed,
            address
        })
    })
    console.log(res)
    if (res.ok) {
        console.log("2")
        return (
            <h1 className="title">License verified</h1>
        );
    } else {
        console.log("1")
        return (
            <Navigate to="/login?warning=License%20unverified" />
        );
    }

}

export default Games;