import React from "react";
import {useNavigate} from "react-router-dom";
import {Fab} from '@material-ui/core'
import HighlightIcon from '@material-ui/icons/Highlight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header() {

  const navigate = useNavigate();

  function handleLogOut(event) {
    navigate("/notes", {loginStatus: false});
    event.preventDefault();
  }

  return (
    <header>
      <div style={{display: "block", margin: "12px auto"}}><h1><HighlightIcon />Keeper</h1></div>
      <div style={{display: "block", float: "right", position: "relative", bottom: "58px"}}><Fab onClick={handleLogOut}><ExitToAppIcon /></Fab></div>
    </header>
  );
}

export default Header;
