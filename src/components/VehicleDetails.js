import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { AccountTree, Build, DirectionsCar, Event, Gavel, LocalGasStation, SwapHoriz, Work } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import config from "../config";
import { selectSelectedVehicleId } from "../redux/VehiclePickerSlice";


const useStyles = makeStyles(() => ({
    root: {
        maxHeight: '100%',
        overflow: 'auto'
    }
}))


export default function VehicleDetails() {
    const [vehicle, setVehicle] = useState(null);
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const classes = useStyles();

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.API_URL}/vehicle/${selectedVehicleId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
            .then((response) => {
                setVehicle(response.data);
            })
    }, [selectedVehicleId])

    if (vehicle === null) {
        return <div>Loading...</div>
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
        </List>
    )
}