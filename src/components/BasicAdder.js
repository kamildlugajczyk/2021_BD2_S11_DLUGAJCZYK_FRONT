import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import config from '../config';
import { addVehicleType } from '../services/VehicleType';
import { addFunction } from '../services/Functions';
import { addVehiclePurpose } from '../services/VehiclePurpose';
import { addOperationType } from '../services/OperationType';
import { addServiceType } from '../services/ServiceType';
import { addBrandModel } from '../services/BrandModel';
import { addSubcontractor } from '../services/Subcontractor';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: '20%',
        width: '100%',
        display: 'flex',
        background: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textInput: {
        marginBottom: theme.spacing(1)
    }
}));

export default function BasicAdder(props) {
    var addItem;
    const classes = useStyles();
    const [input, setInput] = useState("");
    var data = {
        id: 0,
        name: input,
    };
    var windowHeader = 'Add '
    switch(props.item){
        case 'Type':
            windowHeader+='vehicle type';
            addItem = addVehicleType;
            break;
        case 'Purpose':
            windowHeader+='vehicle purpose';
            addItem = addVehiclePurpose;
            break;
        case 'OperationType':
            windowHeader+='operation type';
            addItem = addOperationType;
            break;
        case 'ServiceTypes':
            windowHeader+='service type';
            addItem = addServiceType;
            break;
        case 'Function':
            windowHeader+='employee\'s function';
            addItem = addFunction;
            break;
        default:
            windowHeader+='default';
            break;
    }
    
    function addClicked(data){
        addItem(data);
        window.location.reload();
    }

    // support for the enter key without reloading the page
    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            addItem(data);
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [addItem]);

    return (
        <div>
            <Container >
                <CssBaseline />
                <div className={classes.paper}>
                    <form>
                        <h1>{windowHeader}</h1>
                        <TextField
                            className={classes.textInput}
                            id="input"
                            label="Name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            autoComplete="name"
                            onChange={(l) => { setInput(l.target.value) }}
                        />
                        <Button
                            onClick={() => addClicked(data)}
                            variant="contained"
                            fullWidth
                        >
                            Add
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}