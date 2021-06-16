import axios from "axios";
import config from "../config";




export function addEmployee(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/person`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getEmployee(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/person/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getAllEmployees() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/person`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}