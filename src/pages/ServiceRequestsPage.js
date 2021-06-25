import { CircularProgress, makeStyles, Button, Modal } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApproveServiceRequestDialog from "../components/dialogs/ApproveServiceRequestDialog";
import MenuBar from "../components/MenuBar";
import { selectSelectedServiceRequestId, setSelectedServiceRequestId } from "../redux/ServiceRequesListSlice";
import { setSelected } from "../redux/VehiclePickerSlice";
import { getServiceRequestsForMyVehicles } from "../services/ServiceRequest";
import { getMyPermissions } from "../services/UserAccount";
import LoginPage from "./LoginPage";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "fixed",
        height: "100%",
        width: "100%"
    },
    content: {
        display: 'flex',
        flexDirection: "column",
        flex: "1"
    },
    list: {
        height: "100%",
        paddingRight: 15,
        flex: "1"
    },
    buttons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 20,
        paddingBottom: 30,
        width: "50%",
        marginLeft: "50%",
        transform: "translate(-50%)"
    },
    loading: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        position: 'fixed',
        width: "25%",
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
}))


export default function ServiceRequestsGate() {
    const classes = useStyles();
    const [isTokenValid, setIsTokenValid] = useState(null);

    //fetching user permissions to check if the locally stored token is still valid
    useEffect(() => {
        getMyPermissions()
            .then((response) => {
                localStorage.setItem("user-permissions", response.data[0].authority);
                setIsTokenValid(true);
            })
            .catch(() => {
                setIsTokenValid(false);
            })
    }, [])

    if (isTokenValid === null) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            {isTokenValid === true ? <ServiceRequestsPage /> : <LoginPage />}
        </div>
    )
}

function ServiceRequestsPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedServiceRequestId = useSelector(selectSelectedServiceRequestId);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "vehicleId", headerName: "Vehicle ID", width: 150 },
        { field: "vehicleModel", headerName: "Vehicle", width: 200 },
        { field: "requester", headerName: "Requested by", width: 200 },
        { field: "serviceType", headerName: "Service type", width: 200 },
        { field: "description", headerName: "Description", width: 500 }
    ]

    const [isExecuteModalOpen, setIsExecuteModalOpen] = useState(false);
    const [viewUpdater, setViewUpdater] = useState(false);
    const [serviceRequests, setServiceRequests] = useState(null);

    useEffect(() => {
        getServiceRequestsForMyVehicles()
            .then((response) => {
                setServiceRequests(response.data);
            })
    }, [viewUpdater])

    if (!serviceRequests) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    let rows = [];
    serviceRequests.forEach((request) => {
        rows = rows.concat([{
            id: request.id,
            vehicleId: request.vehiclesId,
            vehicleModel: `${request.vehicleDTO.brandmodel.brand} ${request.vehicleDTO.brandmodel.model} (${request.vehicleDTO.brandmodel.modelYear})`,
            requester: `${request.personDTO.firstname} ${request.personDTO.lastname}`,
            serviceType: request.serviceType.name,
            description: request.description
        }])
    })


    return (
        <div className={classes.root}>
            <MenuBar selected="service-reuqests" />
            <div className={classes.content}>
                <div className={classes.list}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableMultipleSelection={true}
                        onRowSelected={(row) => {
                            dispatch(setSelected(row.data.vehicleId));
                            dispatch(setSelectedServiceRequestId(row.data.id));
                        }}
                    />
                </div>
                {selectedServiceRequestId !== 0 &&
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            onClick={() => { setIsExecuteModalOpen(true) }}
                        >
                            Approve request
                        </Button>
                        <Modal
                            open={isExecuteModalOpen}
                            onClose={() => { setIsExecuteModalOpen(false) }}
                        >
                            <div className={classes.modal}>
                                <ApproveServiceRequestDialog
                                    onClose={(isListUpdated) => {
                                        setIsExecuteModalOpen(false);
                                        if (isListUpdated) {
                                            setViewUpdater(!viewUpdater);
                                        }
                                    }}
                                />
                            </div>
                        </Modal>
                    </div>
                }
            </div>
        </div>
    )

}