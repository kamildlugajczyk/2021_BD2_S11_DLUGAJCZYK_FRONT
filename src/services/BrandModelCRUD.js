import axios from 'axios';
import config from '../config';



// params:
// {
//     "brand": "string",
//     "id": 0,
//     "model": "string",
//     "modelYear": "string"
// }
export function addBrandModel(params) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/brandmodel`,
        data: params,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getBrandModel(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/brandmodel/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getAllBrandModels() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/brandmodel`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// params:
// {
//     "brand": "string",
//     "id": 0,
//     "model": "string",
//     "modelYear": "string"
// }
export function editBrandModel(params) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/brandmodel`,
        data: params,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteBrandModel(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/brandmodel/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}
