import React from "react";
import {Fab} from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {

  function deleteButton() {
    props.delete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Fab onClick={deleteButton}><DeleteIcon /></Fab>
    </div>
  );
}

export default Note;
