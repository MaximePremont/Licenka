import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";

function Games() {
    const [isLicenseVerifed, setIsLicenseVerifed] = useState(null);
    const cookies = new Cookies();
    console.log(cookies.get('nonce_signed'), cookies.get('address'))
    const nonce_signed = cookies.get('nonce_signed');
    const address = cookies.get('address');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACK_BASE_URL}/verify`, {
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
        }).then(res => {
            if (res.ok) {
                setIsLicenseVerifed(true);
            } else {
                setIsLicenseVerifed(false);
            }
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <div className="">
            {isLicenseVerifed == null ?
                <h1 className="title">Verification in progress</h1> :
                isLicenseVerifed ?
                    <h1 className="title">License verified</h1> :
                    <Navigate to="/?warning=License%20unverified" />
            }
        </div>
    );
}

export default Games;
