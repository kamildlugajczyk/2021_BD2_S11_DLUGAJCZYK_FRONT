import axios from 'axios';
import config from '../config';



export function getOperationTypes() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/operation/type`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//     "name": "string"
// }
export function addOperationType(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/operation/type`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getOperationType(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/operation/type/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//     "name": "string"
// }
export function editOperationType(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/vehicle/type/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteOperationType(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/operation/type/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}