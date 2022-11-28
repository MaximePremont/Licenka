import logo from "../assets/game-controller.png";
import powered from "../assets/powered_licenka.png";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
    const [queryParameters] = useSearchParams()
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `http://localhost:3000/oauth?redirect_uri=http://localhost:3001/auth&license_id=11`;
        window.location.replace(path);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">CloudGames</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={routeChange} id="login" className="button">Login with Licenka</button>
                <p id="buying-license"><a href="http://localhost:3000/approve?id=11&redirect=http://localhost:3001">DON'T HAVE A LICENSE?</a></p>
                <p id="warning">{queryParameters.get("warning")}</p>
                <img src={powered} className="licenka-power" alt="logo" />
            </header>
        </div>
    );
}

export default Login;
