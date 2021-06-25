import { makeStyles, CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedServiceId, setSelectedServiceId } from "../redux/ServiceListSlice";
import { selectSelectedVehicleId } from "../redux/VehiclePickerSlice";
import { getUnfinishedServices } from "../services/Service";



const useStyles = makeStyles((theme) => ({
    loading: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))


export default function ServiceList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedServiceId = useSelector(selectSelectedServiceId);
    const selectedVehicleId = useSelector(selectSelectedVehicleId);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "serviceType", headerName: "Service type", width: 200 },
        { field: "startDate", headerName: "Start date", width: 200 },
        { field: "subcontractor", headerName: "Subcontractor", width: 200 }
    ]

    const [services, setServices] = useState(null);

    useEffect(() => {
        getUnfinishedServices(selectedVehicleId)
            .then((response) => {
                setServices(response.data);
            })
    }, [props.updater, selectedVehicleId])

    if (!services) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    let rows = [];
    services.forEach((service) => {
        rows = rows.concat([{
            id: service.id,
            serviceType: service.serviceTypes.name,
            startDate: service.vehicleUnavailability.startDate,
            subcontractor: service.subcontractors.name
        }])
    })

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            disableMultipleSelection={true}
            onRowSelected={(row) => {
                dispatch(setSelectedServiceId(row.data.id));
            }}
            selectionModel={[selectedServiceId]}
        />
    )
}