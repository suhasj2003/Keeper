import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';


function Select(props) {

    const updateScreen = (event) => {
        console.log(event.target);
        props.updateScreen(event.target.name);
        event.preventDefault();
    };

    const buttonStyle = {
        fontSize: "0.875rem",
        minWidth: "64px",
        boxSizing: "border-box",
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
        fontWeight: "500",
        lineHeight: "1.75",
        borderRadius: "4px",
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
        backgroundColor: "#20bec6",
        color: "white",
        margin: "3px",
        padding: "7px",
        borderWidth: 0
    }
    return (
        <div className="text-center select-center">
            <header style={{marginBottom: "25px", padding: "10px"}}><h1><HighlightIcon fontSize="large" />Keeper</h1></header>
            <button style={buttonStyle} name="register" onClick={updateScreen}>Register</button>
            <button style={buttonStyle} name="login" onClick={updateScreen}>Login</button>
        </div>
    );
}

export default Select;