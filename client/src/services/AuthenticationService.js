import axios from "axios";


const headers = {
    "Content-Type": "application/json",
};

const url = 'http://localhost:8080/api/auth';

async function postRegistrationInfo(email, password) {   

    const response = await axios.post(url + "/register", {username: email, password}, {headers});

    return await response.data;

}

async function postLoginInfo(email, password) {
    const response = await axios.post(url + "/login", {username: email, password}, {headers});

    return await response.data;
}

export {postRegistrationInfo, postLoginInfo};