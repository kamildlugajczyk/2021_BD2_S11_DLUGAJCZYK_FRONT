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
    const [modelInput, setModelInput] = useState("");
    const [yearInput, setYearInput] = useState("");
    var isBasic = true;
    var data = {
        name: input,
    };
    var labels = ['Name', 'Model', 'Year'];
    
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
        case 'BrandModel':
            windowHeader+= 'model';
            isBasic = false;
            labels[0] = 'Brand';
            data = {
                brand: input,
                id: 0,
                model: modelInput,
                modelYear: yearInput,
            };
            addItem = addBrandModel;
            break;
        case 'Subcontractor':
            windowHeader+= 'subcontractor';
            isBasic = false;
            labels = ['Name', 'Address', 'Phone number'];
            data = {
                address: modelInput,
                name: input,
                phoneNumber: yearInput,
            };
            addItem = addSubcontractor;
            break;
        default:
            windowHeader+='default';
            break;
    }
    
    function addClicked(data){
        addItem(data);
        props.onClose();
    }

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
                            label={labels[0]}
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(l) => { setInput(l.target.value) }}
                        />
                        {!isBasic &&
                            <TextField
                            className={classes.textInput}
                            id="modelInput"
                            label={labels[1]}
                            name="model"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(l) => { setModelInput(l.target.value) }}
                        />}
                        {!isBasic &&
                            <TextField
                            className={classes.textInput}
                            id="yearInput"
                            label={labels[2]}
                            name="year"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(l) => { setYearInput(l.target.value) }}
                            />
                        }
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