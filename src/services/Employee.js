import axios from "axios";
import config from "../config";




// data:
// {
//     "firstname": "string",
//     "functionId": 0,
//     "id": 0,
//     "lastname": "string",
//     "password": "string",
//     "phoneNumber": "string",
//     "username": "string"
// }
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

// data:
// {
//     "firstname": "string",
//     "functionId": 0,
//     "id": 0,
//     "lastname": "string",
//     "password": "string",
//     "phoneNumber": "string",
//     "username": "string"
// }
export function editEmployee(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/person/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteEmployee(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/person/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getEmployeesVehicleKeepings(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/person/${id}/keeping`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}
