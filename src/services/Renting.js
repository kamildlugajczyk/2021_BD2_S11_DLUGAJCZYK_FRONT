import axios from "axios";
import config from "../config";



export function getCurrentUserRentings() {
    return axios({
        method: "GET",
        url: `${config.API_URL}/unavailability/unfinished`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function rentVehicle(id, data) {
    return axios({
        method: "POST",
        url: `${config.API_URL}/unavailability/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function finishVehicleRenting(id, data) {
    return axios({
        method: "PUT",
        url: `${config.API_URL}/unavailability/${id}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function cancelVehicleRenting(id) {
    return axios({
        method: "DELETE",
        url: `${config.API_URL}/unavailability/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}