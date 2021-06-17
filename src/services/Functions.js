import axios from "axios"
import config from "../config"




export function addFunction(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/person/function`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getFunction(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/person/function/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getAllFunctions() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/person/function`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function editFunction(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/person/function/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteFunction(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/person/function/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}