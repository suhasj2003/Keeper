import React, { useState } from "react";
import {useLocation} from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Select from "./Select";

function App() {

    const css = document.querySelector("#style-direction");
    let location = useLocation();
    if (location["pathname"] === "/") {
        css.href = "index.css";
        document.querySelector("#bootstrap").disabled = false;
    } else {
        css.href = "notes.css";
        document.querySelector("#bootstrap").disabled = true;
    }

    const [screen, setScreen] = useState(<Select updateScreen={updateScreen} />);

    function updateScreen(name) {
        switch (name) {
            case "register":
                setScreen(<Register updateScreen={updateScreen} />);
                break;
            case "login":
                setScreen(<Login updateScreen={updateScreen} />);
                break;
            case "select":
                setScreen(<Select updateScreen={updateScreen} />);
                break;
            default:
                setScreen(<Select updateScreen={updateScreen} />);
                break;
        }
    }

    return (
        <div>{screen}</div>
    );
}

export default App;