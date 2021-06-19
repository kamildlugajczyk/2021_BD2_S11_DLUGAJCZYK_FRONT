import axios from 'axios';
import config from '../config';



export function getServiceTypes() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/service/type`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//     "name": "string"
// }
export function addServiceType(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/service/type`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getServiceType(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/service/type/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//     "name": "string"
// }
export function updateServiceType(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/service/type/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteServiceType(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/service/type/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}