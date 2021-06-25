import { CircularProgress, FormControl, InputLabel, makeStyles, MenuItem, Typography, Select, TextField, Button, Snackbar } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedServiceRequestId, setSelectedServiceRequestId } from "../../redux/ServiceRequesListSlice";
import { approveServiceRequest, getServiceRequest } from "../../services/ServiceRequest";
import { getSubcontractors } from "../../services/Subcontractor";
import { DateTimePicker } from "@material-ui/pickers";
import { getServiceTypes } from "../../services/ServiceType";
import clsx from "clsx";
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

export default function ApproveServiceRequestDialog(props) {
    const classes = useStyles();
    const selectedServiceRequestId = useSelector(selectSelectedServiceRequestId);
    const dispatch = useDispatch();

    const [description, setDescription] = useState(null);
    const [serviceTypeId, setServiceTypeId] = useState(null);
    const [price, setPrice] = useState(null);
    const [subcontractorId, setSubcontractorId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [subcontractors, setSubcontractors] = useState(null);
    const [serviceTypes, setServiceTypes] = useState(null);
    const [request, setRequest] = useState(null);

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

    const doApprove = useCallback(() => {
        setIsConfirmButtonDisabled(true);
        approveServiceRequest(selectedServiceRequestId, {
            description: description,
            endDate: endDate,
            price: price,
            serviceTypesId: serviceTypeId,
            startDate: startDate,
            subcontractorsId: subcontractorId
        })
            .then(() => {
                dispatch(setSelectedServiceRequestId(0));
                props.onClose(true);
            })
            .catch(() => {
                setSnackbarOpenFlag(true);
                setIsConfirmButtonDisabled(false);
            })
    }, [selectedServiceRequestId, props, dispatch, description, endDate, price, serviceTypeId, startDate, subcontractorId])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }


    useEffect(() => {
        getSubcontractors()
            .then((response) => {
                const sorted = [...response.data].sort((a, b) => {
                    let alower = `${a.name}`.toLowerCase();
                    let blower = `${b.name}`.toLowerCase();
                    return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
                })
                setSubcontractors(sorted);
            })
        getServiceTypes()
            .then((response) => {
                const sorted = [...response.data].sort((a, b) => {
                    let alower = `${a.name}`.toLowerCase();
                    let blower = `${b.name}`.toLowerCase();
                    return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
                })
                setServiceTypes(sorted);
            })
        getServiceRequest(selectedServiceRequestId)
            .then((response) => {
                setRequest(response.data);
                setServiceTypeId(response.data.serviceType.id);
                setDescription(response.data.description);
            })
    }, [selectedServiceRequestId])

    if (!subcontractors || !request) {
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
                    Approve service request
                </Typography>
            </div>
            <div className={classes.flexRow}>
                <DateTimePicker
                    className={classes.spaceAround}
                    value={startDate}
                    onChange={setStartDate}
                    label="Start date"
                    variant="inline"
                    format="DD/MM/yyyy"
                />
                <DateTimePicker
                    className={classes.spaceAround}
                    value={endDate}
                    onChange={setEndDate}
                    label="End date"
                    variant="inline"
                    format="DD/MM/yyyy"
                />
            </div>
            <div className={classes.flexRow}>
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
                <FormControl className={clsx(classes.spaceAround, classes.select)}>
                    <InputLabel shrink>Subcontractor</InputLabel>
                    <Select
                        autoWidth
                        required
                        value={subcontractorId}
                        onChange={(event) => { setSubcontractorId(event.target.value) }}
                    >
                        {
                            subcontractors.map((subcontractor) => {
                                return (
                                    <MenuItem value={subcontractor.id}>
                                        {subcontractor.name}
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
                    onClick={doApprove}
                    disabled={
                        !description || !serviceTypeId || !price || !subcontractorId || !startDate || !endDate
                        || isConfirmButtonDisabled
                    }
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