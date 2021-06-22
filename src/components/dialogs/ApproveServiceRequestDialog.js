import { CircularProgress, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getSubcontractors } from "../../services/Subcontractor";



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

export default function ApproveServiceRequestDialog(props) {
    const classes = useStyles();

    const [description, setDescription] = useState(null);
    const [serviceTypeId, setServiceTypeId] = useState(null);
    const [price, setPrice] = useState(null);
    const [subcontractorId, setSubcontractorId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [subcontractors, setSubcontractors] = useState(null);
    const [request, setRequest] = useState(null);

    useEffect(() => {
        getSubcontractors()
            .then((response) => {
                const sorted = [...response.data].sort((a, b) => {
                    let alower = `${a.name}`.toLowerCase();
                    let blower = `${b.name}`.toLowerCase();
                    return (alower > blower) ? 1 : (alower < blower) ? -1 : 0
                })
                setSubcontractors(sorted);
            })
    }, [])

    if (!subcontractors) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className={classes.root}>
            test
        </div>
    )
}