import { makeStyles } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedEmployeeId } from "../../redux/EmployeesListSlice";
import { getAllFunctions } from "../../services/Functions";



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    flexRow: {
        display: "flex",
        width: "90%"
    },
    spaceAround: {
        margin: "10px",
        flex: "3"
    },
    select: {
        minWidth: "100px"
    },
    loading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))


export default function AddEmployeeDialog(props) {
    const classes = useStyles();
    const selectedEmployeeId = useSelector(selectSelectedEmployeeId);
    const dispatch = useDispatch();

    const [snackbarOpenFlag, setSnackbarOpenFlag] = useState(false);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [id, setId] = useState(null);
    const [functionId, setFunctionId] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [functions, setFunctions] = useState(null);

    const doAdd = useCallback(() => {

    }, [])

    const doEdit = useCallback(() => {

    }, [])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpenFlag(false);
    }

    useEffect(() => {
        getAllFunctions()
            .then((response) => {
                setFunctions(response.data);
            })
    }, [props, selectedEmployeeId])


}