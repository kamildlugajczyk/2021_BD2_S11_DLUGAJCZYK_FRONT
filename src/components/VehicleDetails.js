import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { DirectionsCar, Event, Gavel, SwapHoriz } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import config from "../config";
import { selectSelectedVehicleId } from "../redux/VehiclePickerSlice";


export default function VehicleDetails() {
    const [vehicle, setVehicle] = useState(null);
    const selectedVehicleId = useSelector(selectSelectedVehicleId);

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
        <List>
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
                    primary={vehicle.mileage}
                    secondary="Mileage"
                />
            </ListItem>
        </List>
    )
}