import { CircularProgress, makeStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedRentingId, setSelectedRentingId } from "../redux/RentingListSlice";
import { setSelectedVehicleId } from "../redux/VehiclePickerSlice";
import { getCurrentUserRentings } from "../services/Renting";




const useStyles = makeStyles((theme) => ({
    loading: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

export default function RentingList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedRentingId = useSelector(selectSelectedRentingId);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "vehicleId", headerName: "Vehicle ID", width: 200 },
        { field: "vehicleModel", headerName: "Vehicle model", width: 200 },
        { field: "startDate", headerName: "Start date", width: 200 },
        { field: "endDate", headerName: "End date (predicted)", width: 200 },
    ]

    const [rentings, setRentings] = useState(null);

    useEffect(() => {
        getCurrentUserRentings()
            .then((response) => {
                setRentings(response.data);
            })
    }, [props.updater])

    if (!rentings) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    let rows = [];
    rentings.forEach((renting) => {
        rows = rows.concat([{
            id: renting.rentingId,
            vehicleId: renting.vehicleDTO.id,
            vehicleModel: `${renting.vehicleDTO.brandmodel.brand} ${renting.vehicleDTO.brandmodel.model} (${renting.vehicleDTO.brandmodel.modelYear})`,
            startDate: renting.startDate,
            endDate: renting.predictedEndDate
        }])
    })

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            disableMultipleSelection={true}
            onRowSelected={(row) => {
                dispatch(setSelectedRentingId(row.data.id));
                dispatch(setSelectedVehicleId(row.data.vehicleId));
            }}
            selectionModel={[selectedRentingId]}
        />
    )
}