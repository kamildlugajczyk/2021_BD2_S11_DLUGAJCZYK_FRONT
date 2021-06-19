import axios from 'axios';
import config from '../config';


// data:
// {
//     "id": 0,
//     "name": "string"
// }
export function addVehiclePurpose(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/vehicle/purpose`,
        data: data,
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

// data:
// {
//     "id": 0,
//     "name": "string"
// }
export function editVehiclePurpose(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/vehicle/purpose/${id}`,
        data: data,
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