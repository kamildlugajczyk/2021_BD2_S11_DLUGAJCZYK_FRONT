import { Button, CircularProgress, FormControl, InputLabel, makeStyles, MenuItem, Select, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedVehicleId } from "../../redux/VehiclePickerSlice";
import { getAllEmployees } from "../../services/Employee";
import { changeVehicleKeeper, getVehicleKeeper } from "../../services/Vehicle";





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
    select: {
        minWidth: "100px"
    },
    loading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

export default function ChangeKeeperDialog(props) {
    const classes = useStyles();
    const selectedVehicleId = useSelector(selectSelectedVehicleId);

    const [employeeList, setEmployeeList] = useState(null);
    const [keeperId, setKeeperId] = useState(null);

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);


    const doChangeKeeper = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        changeVehicleKeeper(selectedVehicleId, {
            personId: keeperId
        })
            .then(() => {
                props.onClose(true);
            })
            .catch(() => {
                setSnackbarOpenFlag(true);
                setIsConfirmButtonDisabled(false);
            })
    }, [props, keeperId, selectedVehicleId]) 

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }


    useEffect(() => {
        getAllEmployees()
            .then((response) => {
                setEmployeeList(response.data);
            })
        
        getVehicleKeeper(selectedVehicleId)
        .then((response) => {
            setKeeperId(response.data.id);
        })
    }, [selectedVehicleId])

    if (!employeeList) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <form className={classes.root}>
            <div className={classes.flexRow}>
                <Typography
                    variant="h6"
                    color="textSecondary"
                >
                    Change keeper
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <FormControl className={clsx(classes.spaceAround, classes.select)}>
                    <InputLabel shrink>Keeper</InputLabel>
                    <Select
                        autoWidth
                        required
                        value={keeperId}
                        onChange={(event) => {setKeeperId(event.target.value)}}
                    >
                        {
                            employeeList.map((employee) => {
                                return (
                                    <MenuItem value={employee.id}>
                                        {`${employee.firstname} ${employee.lastname}`}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className={classes.flexRow}>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    disabled={!keeperId || isConfirmButtonDisabled}
                    onClick={doChangeKeeper}
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