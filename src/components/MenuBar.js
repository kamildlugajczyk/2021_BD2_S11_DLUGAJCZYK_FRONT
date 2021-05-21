import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    makeStyles,
    ListItemText
} from '@material-ui/core';

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
}))

export default function MenuBar(props) {
    const classes = useStyles();
    const [isAdmin, setIsAdmin] = useState(false);

    function logout() {
        localStorage.removeItem("AUTH_TOKEN");
        axios.defaults.headers.common["Authorization"] = null;
        if (window.location.pathname === "/") {
            window.location.reload();
        } else {
            window.location.replace(`${window.location.origin}/`);
        }
    }

    useEffect(() => {
        axios.get("/my-permissions")
        .then((response) => {
            if (response.data.permissions === "admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        })
        .catch(() => {
            //setIsAdmin(false);
            setIsAdmin(true);
        })
    }, [])

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <List>
                <ListItem button key="all-vehicles" selected={props.selected === "all-vehicles"} to="/" component={RouterLink}>
                    <ListItemText primary="All vehicles" />
                </ListItem>
                <ListItem button key="book-vehicle" selected={props.selected === "book-vehicle"} to="/book-vehicle" component={RouterLink}>
                    <ListItemText primary="Book a vehicle" />
                </ListItem>
                <ListItem button key="my-bookings" selected={props.selected === "my-bookings"} to="/my-bookings" component={RouterLink}>
                    <ListItemText primary="My bookings" />
                </ListItem>
                <ListItem button key="my-vehicles" selected={props.selected === "my-vehicles"} to="/my-vehicles" component={RouterLink}>
                    <ListItemText primary="My vehicles" />
                </ListItem>
                {isAdmin === true &&
                    <ListItem button key="manage-employees" selected={props.selected === "manage-employees"} to="/manage-employees" component={RouterLink}>
                        <ListItemText primary="Manage employees" />
                    </ListItem>
                }
                {isAdmin === true &&
                    <ListItem button key="admin-panel" selected={props.selected === "admin-panel"} to="/admin-panel" component={RouterLink}>
                        <ListItemText primary="Admin panel" />
                    </ListItem>
                }
                <ListItem button key="logout" onClick={logout}>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    )
}