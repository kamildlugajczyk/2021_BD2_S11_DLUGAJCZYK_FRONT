import { Typography, TextField, Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useCallback, useState } from "react";
import { changeMyPasssword } from "../../services/UserAccount";
import { Alert } from "@material-ui/lab";



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
    }
}))

export default function ChangePasswordDialog(props) {
    const classes = useStyles();

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState(null);

    const doChange = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        changeMyPasssword({
            newPassword: newPassword,
            oldPassword: currentPassword
        })
            .then(() => {
                props.onClose(true);
            })
            .catch(() => {
                setSnackbarOpenFlag(true);
                setIsConfirmButtonDisabled(false);
            })
    }, [newPassword, currentPassword, props])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }

    return (
        <form className={classes.root}>
            <div className={classes.flexRow}>
                <Typography variant="h6" color="textSecondary">
                    Change password
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    required
                    label="Current password"
                    onChange={(event) => { setCurrentPassword(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    required
                    label="New password"
                    onChange={(event) => { setNewPassword(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    required
                    label="Confirm new password"
                    onChange={(event) => { setNewPasswordConfirm(event.target.value) }}
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
                        !currentPassword || !newPassword || (newPassword !== newPasswordConfirm) || isConfirmButtonDisabled
                    }
                    onClick={doChange}
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
                    Error. Check your info.
                </Alert>
            </Snackbar>
        </form>
    )
}