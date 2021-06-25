import axios from "axios";
import config from "../config";


export function addServiceRequest(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/service/request`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getServiceRequest(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/service/request/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getServiceRequestsForMyVehicles() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/service/request/unprocessed/personal`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//     "description": "string",
//     "endDate": "2021-06-25T12:14:10.088Z",
//     "price": 0,
//     "serviceTypesId": 0,
//     "startDate": "2021-06-25T12:14:10.088Z",
//     "subcontractorsId": 0
// }
export function approveServiceRequest(id, data) {
    return axios({
        method: "PATCH",
        url: `${config.API_URL}/service/request/keeper/execute/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteServiceRequest(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/service/request/keeper/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}