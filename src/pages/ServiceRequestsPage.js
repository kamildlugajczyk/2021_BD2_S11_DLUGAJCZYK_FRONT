import { CircularProgress, makeStyles, Button, Modal } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApproveServiceRequestDialog from "../components/dialogs/ApproveServiceRequestDialog";
import DeleteServiceRequestDialog from "../components/dialogs/DeleteServiceRequestDialog";
import MenuBar from "../components/MenuBar";
import ServiceRequestList from "../components/ServiceRequestList";
import { selectSelectedServiceRequestId} from "../redux/ServiceRequesListSlice";
import { getMyPermissions } from "../services/UserAccount";
import LoginPage from "./LoginPage";


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


export default function ServiceRequestsGate() {
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
            {isTokenValid === true ? <ServiceRequestsPage /> : <LoginPage />}
        </div>
    )
}

function ServiceRequestsPage(props) {
    const classes = useStyles();
    const selectedServiceRequestId = useSelector(selectSelectedServiceRequestId);

    const [isExecuteModalOpen, setIsExecuteModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [viewUpdater, setViewUpdater] = useState(false);

    return (
        <div className={classes.root}>
            <MenuBar selected="service-reuqests" />
            <div className={classes.content}>
                <div className={classes.list}>
                    <ServiceRequestList updater={viewUpdater} />
                </div>
                {selectedServiceRequestId !== 0 &&
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            onClick={() => { setIsExecuteModalOpen(true) }}
                        >
                            Approve request
                        </Button>
                        <Modal
                            open={isExecuteModalOpen}
                            onClose={() => { setIsExecuteModalOpen(false) }}
                        >
                            <div className={classes.modal}>
                                <ApproveServiceRequestDialog
                                    onClose={(isListUpdated) => {
                                        setIsExecuteModalOpen(false);
                                        if (isListUpdated) {
                                            setViewUpdater(!viewUpdater);
                                        }
                                    }}
                                />
                            </div>
                        </Modal>
                        <Button
                            variant="contained"
                            onClick={() => { setIsDeleteModalOpen(true) }}
                        >
                            Delete request
                        </Button>
                        <Modal
                            open={isDeleteModalOpen}
                            onClose={() => { setIsDeleteModalOpen(false) }}
                        >
                            <div className={classes.modal}>
                                <DeleteServiceRequestDialog
                                    onClose={(isListUpdated) => {
                                        setIsDeleteModalOpen(false);
                                        if (isListUpdated) {
                                            setViewUpdater(!viewUpdater);
                                        }
                                    }}
                                />
                            </div>
                        </Modal>
                    </div>
                }
            </div>
        </div>
    )

}