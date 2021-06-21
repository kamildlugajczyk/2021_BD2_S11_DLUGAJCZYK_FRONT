import axios from 'axios';
import config from '../config';


// data:
// {
//  "address": "string",
//  "name": "string",
//  "phoneNumber": "string"
//}
export function addSubcontractor(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/service/subcontractor/`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getSubcontractors() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/service/subcontractor/`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getSubcontractorById(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/service/subcontractor/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//  "address": "string",
//  "name": "string",
//  "phoneNumber": "string"
//}
export function updateSubcontractor(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/service/subcontractor/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteSubcontractor(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/service/subcontractor/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}