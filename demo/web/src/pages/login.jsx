import logo from "../assets/game-controller.png";
import powered from "../assets/powered_licenka.png";
import {useSearchParams} from "react-router-dom";

function Login() {
    const [queryParameters] = useSearchParams()

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">CloudGames</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <form method="GET" action="https://licenka.space/oauth?redirect=http://localhost:3000/auth&licenseId=5&">
                    <input type="submit" id="login" className="button" value="Login with Licenka"/>
                </form>
                <p id="buying-license"><a href="https://licenka.space/approve?id=5&redirect=http://localhost:3000">DON'T HAVE A LICENSE?</a></p>
                <p id="warning">{queryParameters.get("warning")}</p>
                <img src={powered} className="licenka-power" alt="logo"/>
            </header>
        </div>
    );
}

export default Login;