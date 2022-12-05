import axios from "axios";

const headers = {
    "Content-Type": "application/json",
};



const url = 'http://localhost:8080/api/notes';


async function getNotes(email) {
    const response = await axios.post(url, {username: email},  {headers: {...headers}});

    return await response.data;
} 

async function addNote(email, note) {
    const response = await axios.post(url + "/add", {username: email, note} ,{headers: {...headers}});

    return await response.data;
}

async function deleteNote(email, _id) {
    const response = await axios.post(url + "/remove", {username: email, _id}, {headers: {...headers}});

    return await response.data;
}

export {getNotes, addNote, deleteNote};