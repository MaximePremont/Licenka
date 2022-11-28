import logo from "../assets/game-controller.png";
import powered from "../assets/powered_licenka.png";
import { useSearchParams } from "react-router-dom";

function Login() {
    const [queryParameters] = useSearchParams()
    const routeChange = () => {
        let path = `${process.env.REACT_APP_LICENKA_BASE_URL}/oauth?redirect_uri=${process.env.REACT_APP_BASE_URL}/auth&license_id=11`;
        window.location.replace(path);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">CloudGames</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={routeChange} id="login" className="button">Login with Licenka</button>
                <p id="buying-license"><a href={`${process.env.REACT_APP_LICENKA_BASE_URL}/approve?id=11&redirect=${process.env.REACT_APP_BASE_URL}`}>DON'T HAVE A LICENSE?</a></p>
                <p id="warning">{queryParameters.get("warning")}</p>
                <img src={powered} className="licenka-power" alt="logo" />
            </header>
        </div>
    );
}

export default Login;
