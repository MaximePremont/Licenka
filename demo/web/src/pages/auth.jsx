import React from 'react';
import {useSearchParams} from "react-router-dom";
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';

function Auth() {
    const [queryParameters] = useSearchParams()
    if (queryParameters.get("nonce_signed") != null &&
        queryParameters.get("address") != null) {
        const cookies = new Cookies();
        cookies.set("address", queryParameters.get("address"))
        cookies.set("nonce_signed", queryParameters.get("nonce_signed"))
    }
        return (
            <Navigate to="/games" />

        );
}

export default Auth;