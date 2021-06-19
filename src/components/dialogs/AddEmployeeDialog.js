import clsx from "clsx";
import { Typography, makeStyles, CircularProgress, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedEmployeeId } from "../../redux/EmployeesListSlice";
import { addEmployee, editEmployee, getAllEmployees, getEmployee } from "../../services/Employee";
import { getAllFunctions } from "../../services/Functions";
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

function getSmallestFreeEmployeeId(employeeArray) {
    return employeeArray[employeeArray.length - 1].id + 1;
}

export default function AddEmployeeDialog(props) {
    const classes = useStyles();
    const selectedEmployeeId = useSelector(selectSelectedEmployeeId);

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [id, setId] = useState(null);
    const [functionId, setFunctionId] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [functions, setFunctions] = useState(null);

    const doAdd = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        addEmployee({
            firstname: firstName,
            functionId: functionId,
            id: id,
            lastname: lastName,
            password: password,
            phoneNumber: phoneNumber,
            username: username
        })
            .then(() => {
                props.onClose(true);
            })
            .catch(() => {
                setSnackbarOpenFlag(true);
                setIsConfirmButtonDisabled(false);
            })
    }, [firstName, functionId, id, lastName, password, phoneNumber, username, props])

    const doEdit = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        editEmployee(id, {
            firstname: firstName,
            functionId: functionId,
            id: id,
            lastname: lastName,
            phoneNumber: phoneNumber,
            username: username
        })
            .then(() => {
                setIsConfirmButtonDisabled(false);
                props.onClose(true);
            })
            .catch(() => {
                setSnackbarOpenFlag(true);
                setIsConfirmButtonDisabled(false);
            })
    }, [firstName, functionId, id, lastName, phoneNumber, username, props])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }

    useEffect(() => {
        getAllFunctions()
            .then((response) => {
                const sorted = [...response.data].sort((a, b) => {
                    let alower = a.name.toLowerCase();
                    let blower = b.name.toLowerCase();
                    return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
                })
                setFunctions(sorted);
            })

        if (!props.edit) {
            getAllEmployees()
                .then((response) => {
                    const sorted = [...response.data].sort((a, b) => { return a.id - b.id });
                    setId(getSmallestFreeEmployeeId(sorted));
                })
        } else {
            getEmployee(selectedEmployeeId)
                .then((response) => {
                    setFirstName(response.data.firstname);
                    setLastName(response.data.lastname);
                    setId(response.data.id);
                    setFunctionId(response.data.function.id);
                    setPhoneNumber(response.data.phoneNumber);
                    setUsername(response.data.username);
                })
        }
    }, [props, selectedEmployeeId])

    if (functions === null || id === null) {
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
                    {props.edit ? "Edit employee" : "Add employee"}
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
                <TextField
                    className={classes.spaceAround}
                    required
                    label="First name"
                    value={firstName}
                    onChange={(event) => { setFirstName(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    className={classes.spaceAround}
                    required
                    label="Last name"
                    value={lastName}
                    onChange={(event) => { setLastName(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    required
                    label="Phone number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => { setPhoneNumber(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <FormControl className={clsx(classes.select, classes.spaceAround)}>
                    <InputLabel shrink>Function</InputLabel>
                    <Select
                        autoWidth
                        required
                        value={functionId}
                        onChange={(event) => { setFunctionId(event.target.value) }}
                    >
                        {
                            functions.map((func) => {
                                return (
                                    <MenuItem value={func.id}>
                                        {func.name}
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
                    label="Username"
                    value={username}
                    onChange={(event) => { setUsername(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                {!props.edit &&
                    <TextField
                        className={classes.spaceAround}
                        required
                        label="Password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                }
            </div>
            <div className={classes.flexRow}>
                <Button
                    className={classes.spaceAround}
                    variant="contained"
                    disabled={
                        !firstName || !lastName || !id || !functionId || !phoneNumber || !username 
                        || (!props.edit && !password) || isConfirmButtonDisabled
                    }
                    onClick={props.edit ? doEdit : doAdd}
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