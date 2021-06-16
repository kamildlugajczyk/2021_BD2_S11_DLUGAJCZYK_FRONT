import axios from "axios";
import config from "../config";




// data:
// {
//     "password": "string",
//     "username": "string"
// }
export function login(data) {
    return axios({
        method: 'POST',
        url: `${config.API_URL}/login`,
        data: data
    })
}

export function getMyPermissions() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/authorities`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//     "newPassword": "string",
//     "oldPassword": "string"
// }
export function changeMyPasssword(data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/person/password`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}