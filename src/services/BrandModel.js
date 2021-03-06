import axios from 'axios';
import config from '../config';



// data:
// {
//     "brand": "string",
//     "id": 0,
//     "model": "string",
//     "modelYear": "string"
// }
export function addBrandModel(data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/vehicle/brandmodel`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getBrandModel(id) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle/brandmodel/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getAllBrandModels() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/vehicle/brandmodel`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

// data:
// {
//     "brand": "string",
//     "id": 0,
//     "model": "string",
//     "modelYear": "string"
// }
export function editBrandModel(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/vehicle/brandmodel/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function deleteBrandModel(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/vehicle/brandmodel/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}
