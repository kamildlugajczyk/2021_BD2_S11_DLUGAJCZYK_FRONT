import axios from "axios";
import config from "../config";


export function finishService(id) {
    return axios({
        method: "PATCH",
        url: `${config.API_URL}/service/keeper/${id}/finish`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}

export function getUnfinishedServices(vehicleId) {
    return axios({
        method: "GET",
        url: `${config.API_URL}/service/vehicle/${vehicleId}/unfinished`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
        }
    })
}