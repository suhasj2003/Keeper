import React, { useState } from "react";
import { Fab, Zoom } from '@material-ui/core'
import Add from '@material-ui/icons/Add';

function CreateArea(props) {

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChanges(event) {
    const { value, name } = event.target;
    setNote((prevValue) => ({ ...prevValue, [name]: value }));
    event.preventDefault();
  }

  function buttonClick(event) {
    props.addNote(note);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }

  const [expanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {expanded && <input name="title" placeholder="Title" onChange={handleChanges} value={note.title} />}
        <textarea name="content" placeholder="Take a note..." onClick={expand} onChange={handleChanges} rows={expanded ? "3" : "1"} value={note.content} />
        <Zoom in={expanded}><Fab onClick={buttonClick}><Add /></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
