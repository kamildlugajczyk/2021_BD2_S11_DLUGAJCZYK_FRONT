import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';
import VehiclePicker from '../components/VehiclePicker';
import LoginPage from './LoginPage';
import VehicleCalendar from '../components/VehicleCalendar';
import { useSelector } from 'react-redux';
import { selectSelectedVehicleId } from '../redux/VehiclePickerSlice';
import { Button, CircularProgress, makeStyles, Modal } from '@material-ui/core';
import config from '../config';
import VehicleDetails from '../components/VehicleDetails';
//import ButtonModal from '../components/ButtonModal';
import AddVehicleDialog from '../components/dialogs/AddVehicleDialog';
import DeleteVehicleDialog from '../components/dialogs/DeleteVehicleDialog';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "fixed",
        height: "100%",
        width: "100%"
    },
    content: {
        display: 'flex',
        flex: "1"
    },
    pickerAdminBlock: {
        width: "40%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        flex: "40"
    },
    picker: {
        height: '100%',
        flex: "1",
        paddingRight: "0.5%"
    },
    adminButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingBottom: 30
    },
    calendarDetailsBlock: {
        paddingLeft: "1%",
        paddingRight: "1.5%",
        height: "100%",
        flex: "60"
    },
    calendar: {
        height: "50%"
    },
    details: {
        height: "45%"
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

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isKeeperModalOpen, setIsKeeperModalOpen] = useState(false);

    // switch for updating VehiclePicker, listened to for changes by the internal useEffect of VehiclePicker
    const [vehicleListUpdater, setVehicleListUpdater] = useState(false);

    return (
        <div className={classes.root}>
            <MenuBar selected="all-vehicles" />
            <div className={classes.content}>
                <div className={classes.pickerAdminBlock}>
                    <div className={classes.picker}>
                        <VehiclePicker url="/vehicle" updater={vehicleListUpdater} />
                    </div>
                    {isAdmin &&
                        <div className={classes.adminButtons}>
                            <Button
                                variant="contained"
                                onClick={() => { setIsAddModalOpen(true) }}
                            >
                                Add vehicle
                            </Button>
                            <Modal
                                open={isAddModalOpen}
                                onClose={() => { setIsAddModalOpen(false) }}
                            >
                                <div className={classes.modal}>
                                    <AddVehicleDialog
                                        onClose={
                                            (isListChanged) => {
                                                setIsAddModalOpen(false)
                                                if (isListChanged) {
                                                    // flip the switch to update VehiclePicker
                                                    setVehicleListUpdater(!vehicleListUpdater);
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </Modal>
                            {/* <ButtonModal buttonLabel="Add vehicle">
                                <div>
                                    <AddVehicleDialog />
                                </div>
                            </ButtonModal> */}
                            {selectedVehicleId !== 0 &&
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={() => { setIsEditModalOpen(true) }}
                                    >
                                        Edit vehicle
                                    </Button>
                                    <Modal
                                        open={isEditModalOpen}
                                        onClose={() => { setIsEditModalOpen(false) }}
                                    >
                                        <div className={classes.modal}>
                                            <AddVehicleDialog
                                                edit
                                                onClose={
                                                    (isListChanged) => {
                                                        setIsEditModalOpen(false)
                                                        if (isListChanged) {
                                                            setVehicleListUpdater(!vehicleListUpdater);
                                                        }
                                                    }
                                                }
                                            />
                                        </div>
                                    </Modal>
                                </div>
                                // <ButtonModal buttonLabel="Edit vehicle">
                                //     <div>
                                //         <AddVehicleDialog edit />
                                //     </div>
                                // </ButtonModal>
                            }
                            {selectedVehicleId !== 0 &&
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={() => { setIsDeleteModalOpen(true) }}
                                    >
                                        Delete vehicle
                                    </Button>
                                    <Modal
                                        open={isDeleteModalOpen}
                                        onClose={() => { setIsDeleteModalOpen(false) }}
                                    >
                                        <div className={classes.modal}>
                                            <DeleteVehicleDialog 
                                                onClose={
                                                    (isListChanged) => {
                                                        setIsDeleteModalOpen(false);
                                                        if (isListChanged) {
                                                            setVehicleListUpdater(!vehicleListUpdater);
                                                        }
                                                    }
                                                }
                                            />
                                        </div>
                                    </Modal>
                                </div>
                                // <ButtonModal buttonLabel="Delete vehicle">
                                //     <div>
                                //         delet
                                //     </div>
                                // </ButtonModal>
                            }
                            {selectedVehicleId !== 0 &&
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={() => { setIsKeeperModalOpen(true) }}
                                    >
                                        Change keeper
                                    </Button>
                                    <Modal
                                        open={isKeeperModalOpen}
                                        onClose={() => { setIsKeeperModalOpen(false) }}
                                    >
                                        <div className={classes.modal}>
                                            chang keper xd
                                        </div>
                                    </Modal>
                                </div>
                                // <ButtonModal buttonLabel="Change keeper">
                                //     <div>
                                //         change keper xd
                                //     </div>
                                // </ButtonModal>
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