import logo from "../assets/game-controller.png";
import {Form} from "react-router-dom";
import user from "../assets/user.png";
import lock from "../assets/lock.png";
import powered from "../assets/powered_licenka.png";

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 id="title">CloudGames</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <form method="GET" action="/games">
                    <input type="text" id="address" className="userInput" name="address" placeholder="ADDRESS"/><br/>
                    <img src={user} id="logo-user" alt="logo" />
                    <input type="password" id="password" className="userInput" name="password" placeholder="PASSWORD"/><br/>
                    <img src={lock} id="logo-lock" alt="logo" />
                    <input type="submit" id="login" className="button" value="LOGIN"/>
                </form>
                <p id="buying-license"><a href="https://www.licenka.space/approve">DON'T HAVE A LICENSE?</a></p>
                <img src={powered} className="licenka-power" alt="logo"/>
            </header>
        </div>
    );
}

export default Login;