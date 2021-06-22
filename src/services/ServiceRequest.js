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