import axios from 'axios';
import config from '../config';



// data:
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
export function addVehicle(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/vehicle`,
        data: data,
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


// data:
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
export function editVehicle(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/vehicle/${id}`,
        data: data,
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

export function getVehicleKeeper(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle/${id}/keeper`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//     "personId": 0
// }
export function changeVehicleKeeper(id, data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/vehicle/${id}/keeping`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}