import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { postLoginInfo } from "../../services/AuthenticationService";
import Form from "./Form";

function Login(props) {
    const navigate = useNavigate();
    
    const [loginStatus, setLoginStatus] = useState(true);
        
    function updateScreen(screen) {
        props.updateScreen(screen);
    }

    async function startLogin(email, password) {
        
        let result = {loginStatus: false};
        try {
            result = await postLoginInfo(email, password);
        } catch (err) {
            console.log(err);
        }
        
        if (result.loginStatus) {
            navigate("/notes", {state: {...result}});
        } else {
            setLoginStatus(false);
        }
    }

    return (
        <>
            <Form updateScreen={updateScreen} screenContent="Login" startAuthenticate={startLogin} loginStatus={loginStatus} tryAgain={"Login Failed. Please Try Again."} />
        </>
    );
}

export default Login;