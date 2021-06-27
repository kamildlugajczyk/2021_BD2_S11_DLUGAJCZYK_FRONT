import { FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedRentingId } from "../../redux/RentingListSlice";
import { getOperationTypes } from "../../services/OperationType";
import { addOperationCost } from "../../services/Renting";



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


export default function AddOperationalCostDialog(props) {
    const classes = useStyles();
    const selectedRentingId = useSelector(selectSelectedRentingId);

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

    const [operationTypes, setOperationTypes] = useState(null);

    const [operationTypeId, setOperationTypeId] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);

    const doAdd = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        addOperationCost({
            operationTypeId: operationTypeId,
            price: price,
            description: description,
            vehicleRentingId: selectedRentingId
        })
            .then(() => {
                props.onClose(false);
            })
            .catch(() => {
                setSnackbarOpenFlag(true);
                setIsConfirmButtonDisabled(false);
            })
    }, [operationTypeId, price, description, selectedRentingId, props])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }


    useEffect(() => {
        getOperationTypes()
            .then((response) => {
                const sorted = [...response.data].sort((a, b) => {
                    let alower = `${a.name}`.toLowerCase();
                    let blower = `${b.name}`.toLowerCase();
                    return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
                })
                setOperationTypes(sorted);
            })
    }, [])

    if (!operationTypes) {
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
                    className={classes.spaceAround}
                    variant="h6" 
                    color="textSecondary"
                >
                    Add operational cost
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <FormControl className={clsx(classes.spaceAround, classes.select)}>
                    <InputLabel shrink>Cost type</InputLabel>
                    <Select
                        autoWidth
                        required
                        value={operationTypeId}
                        onChange={(event) => { setOperationTypeId(event.target.value) }}
                    >
                        {
                            operationTypes.map((operationType) => {
                                return (
                                    <MenuItem value={operationType.id}>
                                        {operationType.name}
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
                    label="Price"
                    value={price}
                    onChange={(event) => { setPrice(event.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </div>
            <div className={classes.flexRow}>
                <TextField
                    className={classes.spaceAround}
                    required
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
                    disabled={
                        !operationTypeId || !price || !description || isConfirmButtonDisabled
                    }
                    onClick={doAdd}
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