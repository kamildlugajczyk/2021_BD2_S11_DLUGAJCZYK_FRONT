import clsx from 'clsx';
import { Button, CircularProgress, FormControl, InputAdornment, InputLabel, makeStyles, MenuItem, Select, Snackbar, TextField, Typography } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { getAllBrandModels } from "../../services/BrandModel";
import { addVehicle, editVehicle, getAllVehicles, getVehicle } from "../../services/Vehicle";
import { getAllVehiclePurposes } from "../../services/VehiclePurpose";
import { getAllVehicleTypes } from "../../services/VehicleType";
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedVehicleId, setSelected } from '../../redux/VehiclePickerSlice';
import { Alert } from '@material-ui/lab';



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    flexRow: {
        display: "flex",
        width: "90%"
    },
    spaceAround: {
        margin: "10px",
        flex: "3"
    },
    idField: {
        width: "50px",
        flex: "1"
    },
    select: {
        minWidth: "100px"
    },
    loading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

function getSmallestFreeVehicleId(vehicleArray) {
    return vehicleArray[vehicleArray.length - 1].id + 1;
}

export default function AddVehicleDialog(props) {
    const classes = useStyles();
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const dispatch = useDispatch();

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);

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


    const doAdd = useCallback(() => {
        addVehicle({
            avgFuelConsumption: avgFuelConsumption,
            brandModelId: brandModelId,
            equipmentLevel: equipmentLevel,
            id: id,
            mileage: mileage,
            plates: plates,
            purposeId: purposeId,
            typeId: typeId,
            vin: vin
        }).then(() => {
            dispatch(setSelected(id));
            props.onClose(true);
        }).catch(() => {
            setSnackbarOpenFlag(true);
        })
    }, [avgFuelConsumption, brandModelId, equipmentLevel, id, mileage, plates, purposeId, typeId, vin, props, dispatch])

    const doEdit = useCallback(() => {
        editVehicle(id, {
            avgFuelConsumption: avgFuelConsumption,
            brandModelId: brandModelId,
            equipmentLevel: equipmentLevel,
            id: id,
            mileage: mileage,
            plates: plates,
            purposeId: purposeId,
            typeId: typeId,
            vin: vin
        }).then(() => {
            props.onClose(true);
        }).catch(() => {
            setSnackbarOpenFlag(true);
        })
    }, [avgFuelConsumption, brandModelId, equipmentLevel, id, mileage, plates, purposeId, typeId, vin, props])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }


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
        if (!props.edit) {
            getAllVehicles().then((response) => {
                const sorted = [...response.data].sort((a, b) => { return a.id - b.id })
                setId(getSmallestFreeVehicleId(sorted));
            })
        }
        if (props.edit) {
            getVehicle(selectedVehicleId).then((response) => {
                setAvgFuelConsumption(response.data.avgFuelConsumption);
                setBrandModelId(response.data.brandmodel.id);
                setEquipmentLevel(response.data.equipmentLevel);
                setId(response.data.id);
                setMileage(response.data.mileage);
                setPlates(response.data.plates);
                setPurposeId(response.data.purpose.id);
                setTypeId(response.data.type.id);
                setVin(response.data.vin);
            })
        }
    }, [props, selectedVehicleId])

    if (brandModels === null || purposes === null || types === null || id === null) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <form className={classes.root}>
            <div className={classes.flexRow}>
                <Typography variant="h6" color="textSecondary">
                    {props.edit ? "Edit vehicle" : "Add vehicle"}
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={clsx(classes.spaceAround, classes.idField)}
                    disabled
                    label="ID"
                    value={id}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <FormControl className={clsx(classes.spaceAround, classes.select)}>
                    <InputLabel shrink>Model</InputLabel>
                    <Select
                        autoWidth
                        required
                        value={brandModelId}
                        onChange={(event) => { setBrandModelId(event.target.value) }}
                    >
                        {
                            brandModels.map((brandModel) => {
                                return (
                                    <MenuItem value={brandModel.id}>
                                        {`${brandModel.brand} ${brandModel.model} (${brandModel.modelYear})`}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl className={clsx(classes.spaceAround, classes.select)}>
                    <InputLabel shrink>Type</InputLabel>
                    <Select
                        autoWidth
                        required
                        value={typeId}
                        onChange={(event) => { setTypeId(event.target.value) }}
                    >
                        {
                            types.map((type) => {
                                return (
                                    <MenuItem value={type.id}>
                                        {type.name}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    required
                    type="number"
                    label="Mileage"
                    value={mileage}
                    onChange={(event) => { setMileage(event.target.value) }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">km</InputAdornment>,
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    className={classes.spaceAround}
                    required
                    label="License plates"
                    value={plates}
                    onChange={(event) => { setPlates(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    required
                    type="number"
                    label="Average fuel consumption"
                    value={avgFuelConsumption}
                    onChange={(event) => { setAvgFuelConsumption(event.target.value) }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">l/100km</InputAdornment>
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    className={classes.spaceAround}
                    required
                    label="Equipment level"
                    value={equipmentLevel}
                    onChange={(event) => { setEquipmentLevel(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <FormControl className={clsx(classes.spaceAround, classes.select)}>
                    <InputLabel shrink>Purpose</InputLabel>
                    <Select
                        autoWidth
                        required
                        value={purposeId}
                        onChange={(event) => { setPurposeId(event.target.value) }}
                    >
                        {
                            purposes.map((purpose) => {
                                return (
                                    <MenuItem value={purpose.id}>
                                        {purpose.name}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <TextField
                    className={classes.spaceAround}
                    required
                    label="VIN"
                    value={vin}
                    onChange={(event) => { setVin(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    disabled={
                        !avgFuelConsumption || !brandModelId || !equipmentLevel || !id || !mileage || !plates
                        || !purposeId || !typeId || !vin
                    }
                    onClick={props.edit ? doEdit : doAdd}
                >
                    Confirm
                </Button>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    onClick={() => {props.onClose(false)}}
                >
                    Cancel
                </Button>
            </div>
            <Snackbar
                open={snackbarOpenFlag}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    Error. Try reopening the dialog or refreshing the page.
                </Alert>
            </Snackbar>
        </form>
    )
}