import axios from 'axios';
import config from '../config';


// params:
// {
//     "id": 0,
//     "name": "string"
// }
export function addVehicleType(params) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/vehicle/type`,
        data: params,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getVehicleType(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle/type/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getAllVehicleTypes() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle/type`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// params:
// {
//     "id": 0,
//     "name": "string"
// }
export function editVehicleType(id, params) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/vehicle/type/${id}`,
        data: params,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteVehicleType(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/vehicle/type/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}