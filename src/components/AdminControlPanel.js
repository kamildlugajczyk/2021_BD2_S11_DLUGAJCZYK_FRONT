import React, { useState } from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BasicAdder from './BasicAdder';
import BasicRemover from './BasicRemover';

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


export default function AdminControlPanel() {
    const classes = useStyles();
    const [itemType, setItemType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [removeItemType, setRemoveItemType] = useState(null);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const genericAdd = (itemType) => {
        setItemType(itemType);
        setIsModalOpen(true);
    }
    const genericDelete = (removeItemType) => {
        setRemoveItemType(removeItemType);
        setIsRemoveModalOpen(true);
    }

    return (
        <div className={classes.page}>
            <div className={classes.buttonsColumn}>
                <Button onClick={() => genericAdd('BrandModel')} className={classes.button} variant="contained">
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
                <Button onClick={() => genericAdd('Subcontractor')} className={classes.button} variant="contained">
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
                <Button onClick={() => genericDelete('ServiceTypes')} className={classes.button} variant="contained">
                    Delete service type
                </Button>
                <Button onClick={() => genericDelete('Function')} className={classes.button} variant="contained">
                    Delete employee's function
                </Button>
                <Button onClick={() => genericDelete('Subcontractor')} className={classes.button} variant="contained">
                    Delete subcontractor
                </Button>
            </div>
            <div>
                {itemType !== null &&
                    <Modal
                        open={isModalOpen}
                        onClose={() => { setIsModalOpen(false) }}
                    >
                        <BasicAdder item={itemType} onClose={() => setIsModalOpen(false)}/>
                    </Modal>
                }
            </div>
            <div>
                {removeItemType !== null &&
                    <Modal
                        open={isRemoveModalOpen}
                        onClose={() => { setIsRemoveModalOpen(false) }}
                    >
                        <BasicRemover item={removeItemType} onClose={() => setIsRemoveModalOpen(false)}/>
                    </Modal>
                }
            </div>
        </div>
    );
}