import axios from 'axios';
import config from '../config';


// data:
// {
//     "id": 0,
//     "name": "string"
// }
export function addVehicleType(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/vehicle/type`,
        data: data,
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

// data:
// {
//     "id": 0,
//     "name": "string"
// }
export function editVehicleType(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/vehicle/type/${id}`,
        data: data,
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