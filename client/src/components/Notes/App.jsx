import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {getNotes, addNote, deleteNote} from "../../services/NoteService";



function App() {
  const [notes, setNotes] = useState([]);
  
  const location = useLocation();
  const username = location.state.username;



  async function noteRetrieval(user) {
    const notesResult = await getNotes(user);
    if (notesResult === null) {
      setNotes([]);   
    } else {
      setNotes(notesResult);
    }
  };

  useEffect(() => {noteRetrieval(username);},[]);
  
  const css = document.querySelector("#style-direction");
  if (location["pathname"] === "/") {
      css.href = "index.css";
      document.querySelector("#bootstrap").disabled = false;
  } else {
      css.href = "notes.css";
      document.querySelector("#bootstrap").disabled = true;
  }

  async function addANote(note) {

   
    const result = await addNote(username, note);

    const newNote = {_id: result, ...note}
    setNotes((prev) => ([...prev, newNote]));
  }



  async function deleteANote(_id) {

    const result = await deleteNote(username, _id);

    if (result) {
      setNotes(prev => (prev.filter((note) => note._id !== _id)));
    }    
  }

  

  return (
    <div>
      <Header />
      <CreateArea addNote={addANote}  />
      {notes.map(note => (<Note key={note._id} id={note._id} title={note.title} content={note.content} delete={deleteANote} />))}
      <Footer />
    </div>
  ); 
}







export default App;
