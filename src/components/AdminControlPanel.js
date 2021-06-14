import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BasicAdder from './BasicAdder';

const useStyles = makeStyles((theme) => ({
    page: {
        display: 'flex',
        marginLeft: 200,
    },
    buttonsColumn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: '15%',
        marginTop: '10%'
    },
    button: {
        width: 350,
        height: 50,
        marginBottom: '5%'
        
    }
}))


export default function AdminControlPanel(){
    const classes = useStyles();
    const genericAdd = (itemType) => {
        return(
            <div>
                <BasicAdder item={itemType}/>
            </div>
        )
    }
    const genericDelete = (item) => {

    }
    const addSubcontractor = () => {

    }
    const addModel = () => {

    }

    return (
        <div className={classes.page}>
            <div className={classes.buttonsColumn}>    
                <Button onClick={() => addModel()} className={classes.button} variant="contained">
                    Add model
                </Button>
                <Button onClick={() => genericAdd('Type')} className={classes.button} variant="contained">
                    Add vehicle type
                </Button>       
                <Button onClick={() => genericAdd('Purpose')} className={classes.button} variant="contained">
                    Add purpose
                </Button>
                <Button onClick={() => genericAdd('OperationType')} className={classes.button} variant="contained">
                    Add operation type
                </Button>
                <Button onClick={() => genericAdd('ServiceTypes')} className={classes.button} variant="contained">
                    Add service type
                </Button>       
                <Button onClick={() => genericAdd('Function')} className={classes.button} variant="contained">
                    Add employee's function
                </Button>
                <Button onClick={() => addSubcontractor()} className={classes.button} variant="contained">
                    Add subcontractor
                </Button>
            </div>
            <div className={classes.buttonsColumn}>     
                <Button onClick={() => genericDelete('BrandModel')} className={classes.button} variant="contained">
                    Delete model
                </Button>
                <Button onClick={() => genericDelete('Type')} className={classes.button} variant="contained">
                    Delete vehicle type
                </Button>       
                <Button onClick={() => genericDelete('Purpose')} className={classes.button} variant="contained">
                    Delete purpose
                </Button>
                <Button onClick={() => genericDelete('OperationType')} className={classes.button} variant="contained">
                    Delete operation type
                </Button>
                <Button onClick={() => genericDelete('ServiceType')} className={classes.button} variant="contained">
                    Delete service type
                </Button>       
                <Button onClick={() => genericDelete('Function')} className={classes.button} variant="contained">
                    Delete employee's function
                </Button>
                <Button onClick={() => genericDelete('Subcontractor')} className={classes.button} variant="contained">
                    Delete subcontractor
                </Button>
            </div>
        </div>
    );
}