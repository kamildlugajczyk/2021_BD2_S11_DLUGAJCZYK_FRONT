import { makeStyles, CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedServiceRequestId, setSelectedServiceRequestId } from "../redux/ServiceRequesListSlice";
import { setSelectedVehicleId } from "../redux/VehiclePickerSlice";
import { getServiceRequestsForMyVehicles } from "../services/ServiceRequest";



const useStyles = makeStyles((theme) => ({
    loading: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

export default function ServiceRequestList(props) {
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

    const [serviceRequests, setServiceRequests] = useState(null);

    useEffect(() => {
        getServiceRequestsForMyVehicles()
            .then((response) => {
                setServiceRequests(response.data);
            })
    }, [props.updater])

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
        <DataGrid
            rows={rows}
            columns={columns}
            disableMultipleSelection={true}
            onRowSelected={(row) => {
                dispatch(setSelectedVehicleId(row.data.vehicleId));
                dispatch(setSelectedServiceRequestId(row.data.id));
            }}
            selectionModel={[selectedServiceRequestId]}
        />
    )
}