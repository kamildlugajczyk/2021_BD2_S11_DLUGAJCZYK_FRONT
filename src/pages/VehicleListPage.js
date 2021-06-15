import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import VehicleCalendar from '../components/VehicleCalendar';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import { CircularProgress, makeStyles } from '@material-ui/core';
import config from '../config';
import VehicleDetails from '../components/VehicleDetails';
import ButtonModal from '../components/ButtonModal';
import AddVehicleDialog from '../components/dialogs/AddVehicleDialog';


const useStyles = makeStyles((theme) => ({
    picker: {
        height: '100%'
    },
    adminButtons: {
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 10
    },
    pickerAdminBlock: {
        width: (window.innerWidth - 200) * 0.4,
        height: window.innerHeight - 20,
        display: 'flex',
        flexDirection: 'column'
    },
    calendar: {
        height: (window.innerHeight - 20) * 0.5
    },
    details: {
        height: (window.innerHeight - 60) * 0.5,
    },
    calendarDetailsBlock: {
        width: (window.innerWidth - 200) * 0.4,
        margin: '0px 100px 0px 100px'
    },
    page: {
        display: 'flex',
        marginLeft: 200
    },
    loading: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));


export default function VehicleListGate() {
    const classes = useStyles();
    const [isTokenValid, setIsTokenValid] = useState(null);

    //fetching user permissions to check if the locally stored token is still valid
    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.API_URL}/authorities`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
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
            {isTokenValid === true ? <VehicleListPage /> : <LoginPage />}
        </div>
    )
}


function VehicleListPage() {
    const selectedVehicleId = useSelector(selectSelectedVehicleId);
    const classes = useStyles();

    const isAdmin = localStorage.getItem("user-permissions") === "ROLE_ADMIN";

    return (
        <div>
            <MenuBar selected="all-vehicles" />
            <div className={classes.page}>
                <div className={classes.pickerAdminBlock}>
                    <div className={classes.picker}>
                        <VehiclePicker url="/vehicle" />
                    </div>
                    {isAdmin &&
                        <div className={classes.adminButtons}>
                            <ButtonModal buttonLabel="Add vehicle">
                                <div>
                                    <AddVehicleDialog />
                                </div>
                            </ButtonModal>
                            {selectedVehicleId !== 0 &&
                                <ButtonModal buttonLabel="Edit vehicle">
                                    <div>
                                        <AddVehicleDialog edit/>
                                    </div>
                                </ButtonModal>
                            }
                            {selectedVehicleId !== 0 &&
                                <ButtonModal buttonLabel="Delete vehicle">
                                    <div>
                                        test
                                    </div>
                                </ButtonModal>
                            }
                        </div>
                    }
                </div>
                {selectedVehicleId !== 0 &&
                    <div className={classes.calendarDetailsBlock}>
                        <div className={classes.calendar}>
                            <VehicleCalendar />
                        </div>
                        <div className={classes.details}>
                            <VehicleDetails />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}