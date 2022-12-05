import React, {useState} from "react";

import HighlightIcon from '@material-ui/icons/Highlight';
import Button from '@material-ui/core/Button';

function Form(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function updateScreen(event) {
        props.updateScreen("select");
        event.preventDefault();
    }

    function handleChanges(event) {
        const {value, name} = event.target;
        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }

    function submit(event) {
        props.startAuthenticate(email, password);
        event.preventDefault();
        setPassword("");
    }

    return (
        <div className="text-center form-center">
            <form style={{boxSizing: "border-box"}} className="form-control">
                <div><header><h1 style={{padding: "10px 0"}}><HighlightIcon fontSize="large" />Keeper</h1></header></div>
                <br />
                <h1 className="h3 mb-3 fw-normal">{props.screenContent}</h1>
                {!props.loginStatus && <p style={{color: "red"}}>{props.tryAgain}</p>}

                <div className="form-floating">
                    <input name="email" style={{marginBottom: "5px"}} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChanges} value={email} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
              
                <div className="form-floating">
                    <input name="password" style={{marginBottom: "20px"}} type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChanges} value={password}  />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
             
                <Button style={{backgroundColor: "#20bec6", color: "white", margin: "3px"}} className="btn btn-lg btn-primary" onClick={submit} >{props.screenContent}</Button>
                <Button style={{backgroundColor: "#20bec6", color: "white", margin: "3px"}} className="btn btn-lg btn-primary" name="select" onClick={updateScreen} >Return</Button>

                <p className="mt-5 mb-3 text-muted">© 2022</p>
            </form>
        </div>
    );
}

export default Form;
