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

    return (
        <div className={classes.page}>
            <div className={classes.buttonsColumn}>
                <Button className={classes.button} variant="contained">
                    Add brand
                </Button>       
                <Button className={classes.button} variant="contained">
                    Add model
                </Button>
                <Button className={classes.button} variant="contained">
                    Add vehicle type
                </Button>       
                <Button className={classes.button} variant="contained">
                    Add purpose
                </Button>
                <Button className={classes.button} variant="contained">
                    Add operation type
                </Button>
                <Button className={classes.button} variant="contained">
                    Add service type
                </Button>       
                <Button className={classes.button} variant="contained">
                    Add employee's function
                </Button>
                <Button className={classes.button} variant="contained">
                    Add subcontractor
                </Button>
            </div>
            <div className={classes.buttonsColumn}>
                <Button className={classes.button} variant="contained">
                    Delete brand
                </Button>       
                <Button className={classes.button} variant="contained">
                    Delete model
                </Button>
                <Button className={classes.button} variant="contained">
                    Delete vehicle type
                </Button>       
                <Button className={classes.button} variant="contained">
                    Delete purpose
                </Button>
                <Button className={classes.button} variant="contained">
                    Delete operation type
                </Button>
                <Button className={classes.button} variant="contained">
                    Delete service type
                </Button>       
                <Button className={classes.button} variant="contained">
                    Delete employee's function
                </Button>
                <Button className={classes.button} variant="contained">
                    Delete subcontractor
                </Button>
            </div>
        </div>
    );
}