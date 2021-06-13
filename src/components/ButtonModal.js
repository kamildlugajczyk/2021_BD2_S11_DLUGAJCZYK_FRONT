import React, { useState } from "react";
import { Button, Modal, makeStyles } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: window.innerWidth*0.2,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
}));

export default function ButtonModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleOpen}
            >
                {props.buttonLabel}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    {props.children}
                </div>
            </Modal>
        </div>
    )
}