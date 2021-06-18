import { CircularProgress, makeStyles, Button, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddEmployeeDialog from '../components/dialogs/AddEmployeeDialog';
import DeleteEmployeeDialog from '../components/dialogs/DeleteEmployeeDialog';
import EmployeesList from '../components/EmployeesList';
import MenuBar from '../components/MenuBar';
import { selectSelectedEmployeeId } from '../redux/EmployeesListSlice';
import { getMyPermissions } from '../services/UserAccount';
import LoginPage from './LoginPage';


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


export default function ManageEmployeesGate() {
    const classes = useStyles();
    const [isTokenValid, setIsTokenValid] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        getMyPermissions()
            .then((response) => {
                localStorage.setItem("user-permissions", response.data[0].authority);
                setIsTokenValid(true);
                if (response.data[0].authority === "ROLE_ADMIN") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch(() => {
                setIsTokenValid(false);
            })
    }, [])

    if (!isTokenValid || !isAdmin) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            {isTokenValid === true && isAdmin === true ? <ManageEmployeesPage /> : <LoginPage />}
        </div>
    )
}



function ManageEmployeesPage(props) {
    const classes = useStyles();
    const selectedEmployeeId = useSelector(selectSelectedEmployeeId);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [viewUpdater, setViewUpdater] = useState(false);


    return (
        <div className={classes.root}>
            <MenuBar selected="manage-employees" />
            <div className={classes.content}>
                <div className={classes.list}>
                    <EmployeesList updater={viewUpdater} />
                </div>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        onClick={() => { setIsAddModalOpen(true) }}
                    >
                        Add employee
                    </Button>
                    <Modal
                        open={isAddModalOpen}
                        onClose={() => { setIsAddModalOpen(false) }}
                    >
                        <div className={classes.modal}>
                            <AddEmployeeDialog
                                onClose={
                                    (isListChanged) => {
                                        setIsAddModalOpen(false)
                                        if (isListChanged) {
                                            setViewUpdater(!viewUpdater);
                                        }
                                    }
                                }
                            />
                        </div>
                    </Modal>
                    {selectedEmployeeId !== 0 &&
                        <div>
                            <Button
                                variant="contained"
                                onClick={() => { setIsEditModalOpen(true) }}
                            >
                                Edit employee
                            </Button>
                            <Modal
                                open={isEditModalOpen}
                                onClose={() => { setIsEditModalOpen(false) }}
                            >
                                <div className={classes.modal}>
                                    <AddEmployeeDialog
                                        edit
                                        onClose={
                                            (isListChanged) => {
                                                setIsEditModalOpen(false)
                                                if (isListChanged) {
                                                    setViewUpdater(!viewUpdater);
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </Modal>
                        </div>
                    }
                    {selectedEmployeeId !== 0 &&
                        <div>
                            <Button
                                variant="contained"
                                onClick={() => { setIsDeleteModalOpen(true) }}
                            >
                                Delete employee
                            </Button>
                            <Modal
                                open={isDeleteModalOpen}
                                onClose={() => { setIsDeleteModalOpen(false) }}
                            >
                                <div className={classes.modal}>
                                    <DeleteEmployeeDialog
                                        onClose={
                                            (isListChanged) => {
                                                setIsDeleteModalOpen(false)
                                                if (isListChanged) {
                                                    setViewUpdater(!viewUpdater);
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </Modal>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}