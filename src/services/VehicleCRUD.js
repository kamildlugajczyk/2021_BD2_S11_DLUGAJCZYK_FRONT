import axios from 'axios';
import config from '../config';



// params:
// {
//   "avgFuelConsumption": Integer,
//   "brandModelId": Integer,
//   "equipmentLevel": String,
//   "id": Integer,
//   "mileage": Integer,
//   "plates": String,
//   "purposeId": Integer,
//   "typeId": Integer,
//   "vin": String
// }
export function addVehicle(params) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/vehicle`,
        data: params,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getVehicle(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getAllVehicles() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}


// params:
// {
//   "avgFuelConsumption": Integer,
//   "brandModelId": Integer,
//   "equipmentLevel": String,
//   "id": Integer,
//   "mileage": Integer,
//   "plates": String,
//   "purposeId": Integer,
//   "typeId": Integer,
//   "vin": String
// }
export function editVehicle(id, params) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/vehicle/${id}`,
        data: params,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteVehicle(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/vehicle/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}