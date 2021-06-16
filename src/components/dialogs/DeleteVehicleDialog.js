import { Button, makeStyles, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedVehicleId, setSelected } from "../../redux/VehiclePickerSlice";
import { deleteVehicle } from "../../services/Vehicle";



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
    loading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))


export default function DeleteVehicleDialog(props) {
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);


    const doDelete = useCallback(() => {
        deleteVehicle(selectedVehicleId)
            .then(() => {
                dispatch(setSelected(0));
                props.onClose(true);
            })
            .catch(() => {
                setSnackbarOpenFlag(true);
            })
    }, [props, selectedVehicleId, dispatch])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }

    return (
        <form className={classes.root}>
            <div className={classes.flexRow}>
                <Typography 
                    className={classes.spaceAround}
                    variant="h6" 
                    color="textSecondary"
                >
                    Delete vehicle
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <Typography 
                    className={classes.spaceAround}
                    variant="body2"
                >
                    Are you sure you want to delete this vehicle?<br />
                    <strong>This operation is irreversible!</strong>
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    onClick={doDelete}
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