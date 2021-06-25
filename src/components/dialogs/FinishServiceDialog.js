import { Button, Snackbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedServiceId, setSelectedServiceId } from "../../redux/ServiceListSlice";
import { finishService } from "../../services/Service";



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

export default function FinishServiceDialog(props) {
    const classes = useStyles();
    const selectedServiceId = useSelector(selectSelectedServiceId);
    const dispatch = useDispatch();

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

    const doFinish = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        finishService(selectedServiceId)
            .then(() => {
                dispatch(setSelectedServiceId(0));
                props.onClose(true);
            })
            .catch(() => {
                setIsConfirmButtonDisabled(false);
                setSnackbarOpenFlag(true);
            })
    }, [props, dispatch, selectedServiceId])

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
                    Finish service
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <Typography 
                    className={classes.spaceAround}
                    variant="body2"
                >
                    Are you sure you want to finish this service?<br />
                    <strong>This operation is irreversible!</strong>
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    onClick={doFinish}
                    disabled={isConfirmButtonDisabled}
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