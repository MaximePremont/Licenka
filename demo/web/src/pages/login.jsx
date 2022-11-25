import logo from "../assets/game-controller.png";
import user from "../assets/user.png";
import lock from "../assets/lock.png";
import powered from "../assets/powered_licenka.png";
import {useSearchParams} from "react-router-dom";

function Login() {
    const [queryParameters] = useSearchParams()

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">CloudGames</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <form method="POST" action="http://localhost:8080/verify">
                    <input type="text" id="address" className="userInput" name="address" placeholder="ADDRESS"/><br/>
                    <img src={user} id="logo-user" alt="logo" />
                    <input type="password" id="password" className="userInput" name="password" placeholder="PASSWORD"/><br/>
                    <img src={lock} id="logo-lock" alt="logo" />
                    <input type="submit" id="login" className="button" value="LOGIN"/>
                </form>
                <p id="buying-license"><a href="http://localhost:8080/approve">DON'T HAVE A LICENSE?</a></p>
                <p id="warning">{queryParameters.get("warning")}</p>
                <img src={powered} className="licenka-power" alt="logo"/>
            </header>
        </div>
    );
}

export default Login;