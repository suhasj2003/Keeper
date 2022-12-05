import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { postRegistrationInfo } from "../../services/AuthenticationService";
import Form from "./Form";

function Register(props) {
    const navigate = useNavigate();
    
    const [loginStatus, setLoginStatus] = useState(true);
        
    function updateScreen(screen) {
        props.updateScreen(screen);
    }

    async function startRegistration(email, password) {
        
        let result = {loginStatus: false};
        try {
            result = await postRegistrationInfo(email, password);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
        if (result.loginStatus) {
            console.log("Hello World");
            navigate("/notes", {state: {...result}});
        } else {
            console.log("Not Hello World");
            setLoginStatus(false);
        }
    }

    return (
        <>
            <Form updateScreen={updateScreen} screenContent="Register" startAuthenticate={startRegistration} loginStatus={loginStatus} tryAgain={"Registration Failed. Please Try Again."} />
        </>
    );
}

export default Register;