import { useEffect, useState } from "react";
import { getAllBrandModels } from "../../services/BrandModel";
import { getAllVehiclePurposes } from "../../services/VehiclePurpose";
import { getAllVehicleTypes } from "../../services/VehicleType";



export default function AddVehicleDialog() {
    const [vehicleProperties, setVehicleProperties] = useState({
        avgFuelConsumption: null,
        brandModelId: null,
        equipmentLevel: null,
        id: null,
        mileage: null,
        plates: null,
        purposeId: null,
        typeId: null,
        vin: null
    })
    const [brandModels, setBrandModels] = useState([]);
    const [purposes, setPurposes] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        getAllBrandModels().then((response) => {
            setBrandModels(response.data);
        })
        getAllVehiclePurposes().then((response) => {
            setPurposes(response.data);
        })
        getAllVehicleTypes().then((response) => {
            setTypes(response.data);
        })
    }, [])
}