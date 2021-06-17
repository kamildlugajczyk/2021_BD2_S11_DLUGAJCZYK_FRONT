import { CircularProgress, makeStyles, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
        paddingBottom: 30
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
    

    return (
        <div className={classes.root}>
            <MenuBar selected="manage-employees" />
            <div className={classes.content}>
                <div className={classes.list}>
                    <EmployeesList />
                </div>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                    >
                        Add employee
                    </Button>
                    {selectedEmployeeId &&
                        <Button
                            variant="contained"
                        >
                            Edit employee
                        </Button>
                    }
                    {
                        <Button
                            variant="contained"
                        >
                            Delete employee
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}