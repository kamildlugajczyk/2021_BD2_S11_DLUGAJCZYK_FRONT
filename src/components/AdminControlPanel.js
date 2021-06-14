import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
    const genericAdd = (item) => {

    }
    const genericDelete = (item) => {

    }
    const addSubcontractor = () => {

    }
    return (
        <div className={classes.page}>
            <div className={classes.buttonsColumn}>    
                <Button onClick={() => genericAdd('model')} className={classes.button} variant="contained">
                    Add model
                </Button>
                <Button onClick={() => genericAdd('vehicle type')} className={classes.button} variant="contained">
                    Add vehicle type
                </Button>       
                <Button onClick={() => genericAdd('purpose')} className={classes.button} variant="contained">
                    Add purpose
                </Button>
                <Button onClick={() => genericAdd('operation type')} className={classes.button} variant="contained">
                    Add operation type
                </Button>
                <Button onClick={() => genericAdd('service type')} className={classes.button} variant="contained">
                    Add service type
                </Button>       
                <Button onClick={() => genericAdd('employee\'s function')} className={classes.button} variant="contained">
                    Add employee's function
                </Button>
                <Button onClick={() => addSubcontractor()} className={classes.button} variant="contained">
                    Add subcontractor
                </Button>
            </div>
            <div className={classes.buttonsColumn}>     
                <Button onClick={() => genericDelete('model')} className={classes.button} variant="contained">
                    Delete model
                </Button>
                <Button onClick={() => genericDelete('vehicle type')} className={classes.button} variant="contained">
                    Delete vehicle type
                </Button>       
                <Button onClick={() => genericDelete('purpose')} className={classes.button} variant="contained">
                    Delete purpose
                </Button>
                <Button onClick={() => genericDelete('operation type')} className={classes.button} variant="contained">
                    Delete operation type
                </Button>
                <Button onClick={() => genericDelete('service type')} className={classes.button} variant="contained">
                    Delete service type
                </Button>       
                <Button onClick={() => genericDelete('employee\'s function')} className={classes.button} variant="contained">
                    Delete employee's function
                </Button>
                <Button onClick={() => genericDelete('subcontractor')} className={classes.button} variant="contained">
                    Delete subcontractor
                </Button>
            </div>
        </div>
    );
}