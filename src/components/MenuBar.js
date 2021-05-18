import React from 'react';
import axios from 'axios';
import {Link as RouterLink} from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    CssBaseline,
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

export default function MenuBar() {
    const classes = useStyles();

    const isAdmin = localStorage.getItem("admin-flag");

    function logout() {
        localStorage.removeItem("AUTH_TOKEN");
        axios.defaults.headers.common["Authorization"] = null;
        if (window.location.pathname === "/") {
            window.location.reload();
        } else {
            window.location.replace(`${window.location.origin}/`);
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List>
                    <ListItem button key="all-vehicles" to="/" component={RouterLink}>
                        <ListItemText primary="All vehicles" />
                    </ListItem>
                    <ListItem button key="book-vehicle" to="/book-vehicle" component={RouterLink}>
                        <ListItemText primary="Book a vehicle" />
                    </ListItem>
                    <ListItem button key="my-bookings" to="/my-bookings" component={RouterLink}>
                        <ListItemText primary="My bookings" />
                    </ListItem>
                    <ListItem button key="my-vehicles" to="/my-vehicles" component={RouterLink}>
                        <ListItemText primary="My vehicles" />
                    </ListItem>
                    { isAdmin &&
                    <ListItem button key="manage-employees" to="/manage-employees" component={RouterLink}>
                        <ListItemText primary="Manage employees" />
                    </ListItem>
                    }
                    { isAdmin &&
                    <ListItem button key="admin-panel" to="/admin-panel" component={RouterLink}>
                        <ListItemText primary="Admin panel" />
                    </ListItem>
                    }
                    <ListItem button key="logout" onClick={logout}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    )
}