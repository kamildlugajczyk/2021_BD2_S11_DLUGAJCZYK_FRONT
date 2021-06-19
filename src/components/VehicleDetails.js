import { CircularProgress, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { AccountTree, Build, DirectionsCar, Event, Gavel, LocalGasStation, Person, SwapHoriz, Work } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedVehicleId } from "../redux/VehiclePickerSlice";
import { getVehicle, getVehicleKeeper } from "../services/Vehicle";


const useStyles = makeStyles(() => ({
    root: {
        maxHeight: '100%',
        overflow: 'auto'
    },
    loading: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))


export default function VehicleDetails(props) {
    const [vehicle, setVehicle] = useState(null);
    const [keeper, setKeeper] = useState(null);
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const classes = useStyles();

    useEffect(() => {
        getVehicle(selectedVehicleId)
            .then((response) => {
                setVehicle(response.data);
            })

        getVehicleKeeper(selectedVehicleId)
            .then((response) => {
                setKeeper(response.data);
            })
            .catch(() => {
                setKeeper({
                    firstname: "<!no",
                    lastname: "keeper!>"
                });
            })
    }, [selectedVehicleId, props.updater])

    if (!vehicle || !keeper) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemIcon>
                    <DirectionsCar />
                </ListItemIcon>
                <ListItemText
                    primary={[vehicle.brandmodel.brand, vehicle.brandmodel.model].join(" ")}
                    secondary="Model"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Event />
                </ListItemIcon>
                <ListItemText
                    primary={vehicle.brandmodel.modelYear}
                    secondary="Production year"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Gavel />
                </ListItemIcon>
                <ListItemText
                    primary={vehicle.plates}
                    secondary="License plates"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <SwapHoriz />
                </ListItemIcon>
                <ListItemText
                    primary={`${vehicle.mileage} km`}
                    secondary="Mileage"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <LocalGasStation />
                </ListItemIcon>
                <ListItemText
                    primary={`${vehicle.avgFuelConsumption} l/100 km`}
                    secondary="Average fuel consumption"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <AccountTree />
                </ListItemIcon>
                <ListItemText
                    primary={vehicle.type.name}
                    secondary="Type"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Work />
                </ListItemIcon>
                <ListItemText
                    primary={vehicle.purpose.name}
                    secondary="Purpose"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Build />
                </ListItemIcon>
                <ListItemText
                    primary={vehicle.vin}
                    secondary="VIN"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <ListItemText
                    primary={`${keeper.firstname} ${keeper.lastname}`}
                    secondary="Keeper"
                />
            </ListItem>
        </List>
    )
}