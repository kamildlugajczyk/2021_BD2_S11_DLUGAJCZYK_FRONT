import { Button, Snackbar, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedRentingId, setSelectedRentingId } from "../../redux/RentingListSlice";
import { finishVehicleRenting } from "../../services/Renting";



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    flexRow: {
        display: "flex",
        width: "90%",
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

export default function FinishRentingDialog(props) {
    const classes = useStyles();
    const selectedRentingId = useSelector(selectSelectedRentingId);
    const dispatch = useDispatch();

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

    const [endMileage, setEndMileage] = useState(null);

    const doFinish = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        finishVehicleRenting(selectedRentingId, {
            endMileage: endMileage
        })
            .then(() => {
                dispatch(setSelectedRentingId(0));
                props.onClose(true);
            })
            .catch(() => {
                setSnackbarOpenFlag(true);
                setIsConfirmButtonDisabled(false);
            })
    }, [selectedRentingId, endMileage, props, dispatch])

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
                    Finish renting
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    required
                    type="number"
                    label="End mileage"
                    value={endMileage}
                    onChange={(event) => {
                        setEndMileage(event.target.value);
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    onClick={doFinish}
                    disabled={!endMileage || isConfirmButtonDisabled}
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
