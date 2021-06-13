import axios from 'axios';
import config from '../config';


// params:
// {
//     "id": 0,
//     "name": "string"
// }
export function addVehiclePurpose(params) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/vehicle/purpose`,
        data: params,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getVehiclePurpose(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle/purpose/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getAllVehiclePurposes() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle/purpose`,
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
export function editVehiclePurpose(id, params) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/vehicle/purpose/${id}`,
        data: params,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteVehiclePurpose(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/vehicle/purpose/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}