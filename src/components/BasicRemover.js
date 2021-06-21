import React, { useEffect } from 'react';
import clsx from "clsx";
import { useState } from 'react';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import { Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@material-ui/core";
import { deleteVehicleType, getAllVehicleTypes } from '../services/VehicleType';
import { deleteFunction, getAllFunctions } from '../services/Functions';
import { deleteVehiclePurpose, getAllVehiclePurposes } from '../services/VehiclePurpose';
import { deleteOperationType, getOperationTypes } from '../services/OperationType';
import { deleteServiceType, getServiceTypes } from '../services/ServiceType';
import { deleteBrandModel, getAllBrandModels } from '../services/BrandModel';
import { deleteSubcontractor, getSubcontractors } from '../services/Subcontractor';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: '20%',
        width: '100%',
        display: 'flex',
        background: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

export default function BasicRemover(props) {
    
    const [id, setId] = useState(null);
    const [items, setItems] = useState(null);
    const classes = useStyles();
    var deleteItem;
    var getItemsList;
    var windowHeader = 'Delete '
    switch(props.item){
        case 'Type':
            windowHeader+='vehicle type';
            getItemsList = getAllVehicleTypes;
            deleteItem = deleteVehicleType;
            break;
        case 'Purpose':
            windowHeader+='vehicle purpose';
            getItemsList = getAllVehiclePurposes;
            deleteItem = deleteVehiclePurpose;
            break;
        case 'OperationType':
            windowHeader+='operation type';
            getItemsList = getOperationTypes;
            deleteItem = deleteOperationType;
            break;
        case 'ServiceTypes':
            windowHeader+='service type';
            getItemsList = getServiceTypes;
            deleteItem = deleteServiceType;
            break;
        case 'Function':
            windowHeader+='employee\'s function';
            getItemsList = getAllFunctions;
            deleteItem = deleteFunction;
            break;
        case 'BrandModel':
            windowHeader+= 'model';
            getItemsList = getAllBrandModels;
            deleteItem = deleteBrandModel;
            break;
        case 'Subcontractor':
            windowHeader+= 'subcontractor';
            getItemsList = getSubcontractors;
            deleteItem = deleteSubcontractor;
            break;
        default:
            windowHeader+='default';
            console.log('default');
            break;
    }

    useEffect(() => {
        getItemsList().then((response) => {
            const list = [...response.data];
            setItems(list);
        })
    })

    function deleteClicked(id){
        deleteItem(id);
        props.onClose();
    }

    if (items === null) {
        return (
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            <Container >
                <CssBaseline />
                <div className={classes.paper}>
                    <form>
                        <h1>{windowHeader}</h1>
                        <FormControl>
                            <InputLabel shrink>Item</InputLabel>
                            <Select
                                fullWidth
                                required
                                value={id}
                                onChange={(event) => { setId(event.target.value) }}
                            >
                                {
                                    items.map((i) => {
                                        return (
                                            <MenuItem fullWidth value={i.id}>
                                                {props.item !== 'BrandModel' && i.name}
                                                {props.item === 'BrandModel' && `${i.brand} ${i.model} (${i.year})`}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button
                            onClick={() => deleteClicked(id)}
                            variant="contained"
                            fullWidth
                        >
                            Delete
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}