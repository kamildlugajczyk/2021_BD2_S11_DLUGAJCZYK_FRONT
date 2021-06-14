import { FormControl, InputLabel, makeStyles, Select, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllBrandModels } from "../../services/BrandModel";
import { getAllVehiclePurposes } from "../../services/VehiclePurpose";
import { getAllVehicleTypes } from "../../services/VehicleType";



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    flexRow: {
        display: "flex"
    },
    spaceAround: {
        margin: "10px"
    }
}))

export default function AddVehicleDialog() {
    const classes = useStyles();

    const [avgFuelConsumption, setAvgFuelConsumption] = useState(null);
    const [brandModelId, setBrandModelId] = useState(null);
    const [equipmentLevel, setEquipmentLevel] = useState(null);
    const [id, setId] = useState(null);
    const [mileage, setMileage] = useState(null);
    const [plates, setPlates] = useState(null);
    const [purposeId, setPurposeId] = useState(null);
    const [typeId, setTypeId] = useState(null);
    const [vin, setVin] = useState(null);

    const [brandModels, setBrandModels] = useState(null);
    const [purposes, setPurposes] = useState(null);
    const [types, setTypes] = useState(null);

    useEffect(() => {
        getAllBrandModels().then((response) => {
            const sorted = [...response.data].sort((a, b) => {
                let alower = `${a.brand} ${a.model} ${a.modelYear}`.toLowerCase();
                let blower = `${b.brand} ${b.model} ${b.modelYear}`.toLowerCase();
                return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
            })
            setBrandModels(sorted);
        })
        getAllVehiclePurposes().then((response) => {
            const sorted = [...response.data].sort((a, b) => {
                let alower = `${a.name}`.toLowerCase();
                let blower = `${b.name}`.toLowerCase();
                return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
            })
            setPurposes(sorted);
        })
        getAllVehicleTypes().then((response) => {
            const sorted = [...response.data].sort((a, b) => {
                let alower = `${a.name}`.toLowerCase();
                let blower = `${b.name}`.toLowerCase();
                return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
            })
            setTypes(sorted);
        })
    }, [])

    if (brandModels === null || purposes === null || types === null) {
        return <div>Loading...</div>
    }

    return (
        <form className={classes.root}>
            <div className={classes.flexRow}>
                <FormControl className={classes.spaceAround}>
                    <InputLabel>Model</InputLabel>
                    <Select
                        native
                        required
                        value={brandModelId}
                        onChange={(event) => { setBrandModelId(event.target.value) }}
                    >
                        {
                            brandModels.map((brandModel) => {
                                return (
                                    <option value={brandModel.id}>
                                        {`${brandModel.brand} ${brandModel.model} (${brandModel.modelYear})`}
                                    </option>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl className={classes.spaceAround}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        native
                        required
                        value={typeId}
                        onChange={(event) => { setTypeId(event.target.value) }}
                    >
                        {
                            types.map((type) => {
                                return (
                                    <option value={type.id}>
                                        {`${type.name}`}
                                    </option>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className={classes.flexRow}>
                
            </div>
        </form>
    )
}