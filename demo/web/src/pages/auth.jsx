import React from 'react';
import {useSearchParams} from "react-router-dom";
import Cookies from 'universal-cookie';

function Auth() {
    const [queryParameters] = useSearchParams()
    if (queryParameters.get("nonce_signed") == null ||
        queryParameters.get("address") == null) {
        const cookies = new Cookies();
        cookies.set("nonce_signed", queryParameters.get("nonce_signed"))
        cookies.set("address", queryParameters.get("address"))
    }
        return (
        <h1 className="title">License verification ...</h1>
    );
}

export default Auth;