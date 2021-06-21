import { Button, Snackbar, Typography } from "@material-ui/core";
import { CircularProgress, makeStyles, FormControl, InputLabel, Select, MenuItem, TextField } from "@material-ui/core";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedVehicleId } from "../../redux/VehiclePickerSlice";
import { getServiceTypes } from "../../services/ServiceType";
import { Alert } from '@material-ui/lab';
import { addServiceRequest } from "../../services/ServiceRequest";




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


export default function ServiceRequestDialog(props) {
    const classes = useStyles();
    const selectedVehicleId = useSelector(selectSelectedVehicleId);

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

    const [description, setDescription] = useState(null);
    // const [serviceTypeId, setServiceTypeId] = useState(null);

    // const [serviceTypes, setServiceTypes] = useState(null);

    const doRequest = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        addServiceRequest({
            description: description,
            // serviceTypesId: serviceTypeId,
            serviceTypeId: 0,
            vehiclesId: selectedVehicleId
        })
            .then(() => {
                props.onClose(false);
            })
            .catch(() => {
                setIsConfirmButtonDisabled(false);
                setSnackbarOpenFlag(true);
            })
    }, [description, selectedVehicleId, /*serviceTypeId,*/ props])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }


    // useEffect(() => {
    //     getServiceTypes()
    //         .then((response) => {
    //             const sorted = [...response.data].sort((a, b) => {
    //                 let alower = `${a.name}`.toLowerCase();
    //                 let blower = `${b.name}`.toLowerCase();
    //                 return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
    //             })
    //             setServiceTypes(sorted);
    //         })
    // }, [])

    // if (serviceTypes === null) {
    //     return (
    //         <div className={classes.loading}>
    //             <CircularProgress />
    //         </div>
    //     )
    // }

    return (
        <form className={classes.root}>
            <div className={classes.flexRow}>
                <Typography variant="h6" color="textSecondary">
                    Request service
                </Typography>
            </div>
            {/* <div className={classes.flexRow}>
                <FormControl className={clsx(classes.spaceAround, classes.select)}>
                    <InputLabel shrink>Service type</InputLabel>
                    <Select
                        autoWidth
                        required
                        value={serviceTypeId}
                        onChange={(event) => { setServiceTypeId(event.target.value) }}
                    >
                        {
                            serviceTypes.map((serviceType) => {
                                return (
                                    <MenuItem value={serviceType.id}>
                                        {serviceType.name}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div> */}
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    multiline
                    label="Description"
                    value={description}
                    onChange={(event) => { setDescription(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    disabled={/*!serviceTypeId ||*/ !description || isConfirmButtonDisabled}
                    onClick={doRequest}
                >
                    Confirm
                </Button>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    onClick={() => { props.onClose(false) }}
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