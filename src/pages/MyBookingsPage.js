import React, { useState, useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import LoginPage from './LoginPage';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { getMyPermissions } from '../services/UserAccount';
import { useSelector } from 'react-redux';
import { selectSelectedRentingId } from '../redux/RentingListSlice';
import RentingList from '../components/RentingList';
import { Modal } from '@material-ui/core';
import AddOperationalCostDialog from '../components/dialogs/AddOperationalCostDialog';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "fixed",
        height: "100%",
        width: "100%"
    },
    content: {
        display: 'flex',
        flexDirection: "column",
        flex: "1"
    },
    list: {
        height: "100%",
        paddingRight: 15,
        flex: "1"
    },
    buttons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 20,
        paddingBottom: 30,
        width: "50%",
        marginLeft: "50%",
        transform: "translate(-50%)"
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
}))

export default function MyBookingsGate() {
    const classes = useStyles();
    const [isTokenValid, setIsTokenValid] = useState(null);

    //fetching user permissions to check if the locally stored token is still valid
    useEffect(() => {
        getMyPermissions()
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
            {isTokenValid === true ? <MyBookingsPage /> : <LoginPage />}
        </div>
    )
}

function MyBookingsPage() {
    const classes = useStyles();
    const selectedRentingId = useSelector(selectSelectedRentingId);

    const [viewUpdater, setViewUpdater] = useState(false);

    const [isCostModalOpen, setIsCostModalOpen] = useState(false);
    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

    return (
        <div className={classes.root}>
            <MenuBar selected="my-bookings" />
            <div className={classes.content}>
                <div className={classes.list}>
                    <RentingList updater={viewUpdater} />
                </div>
                {selectedRentingId !== 0 &&
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            onClick={() => { setIsCostModalOpen(true) }}
                        >
                            Add operational cost
                        </Button>
                        <Modal
                            open={isCostModalOpen}
                            onClose={() => { setIsCostModalOpen(false) }}
                        >
                            <div className={classes.modal}>
                                <AddOperationalCostDialog
                                    onClose={
                                        (isListChanged) => {
                                            setIsCostModalOpen(false);
                                            if (isListChanged) {
                                                setViewUpdater(!viewUpdater);
                                            }
                                        }
                                    }
                                />
                            </div>
                        </Modal>
                        <Button
                            variant="contained"
                            onClick={() => { setIsFinishModalOpen(true) }}
                        >
                            Finish renting
                        </Button>
                        <Modal
                            open={isFinishModalOpen}
                            onClose={() => { setIsFinishModalOpen(false) }}
                        >
                            <div className={classes.modal}>
                                tets
                            </div>
                        </Modal>
                    </div>
                }
            </div>
        </div>
    )
}