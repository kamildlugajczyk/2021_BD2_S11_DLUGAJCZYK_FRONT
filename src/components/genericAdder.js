import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textInput: {
        marginBottom: theme.spacing(1)
    }
}));

export default function GenericAdder(item) {
    const classes = useStyles();
    const [input, setInput] = useState("");
    
    var path = '/';
    var windowHeader = 'Add '
    switch(item){
        case 'Type':
            path.concat('vehicle/type');
            windowHeader.concat('vehicle type');
            break;
        case 'Purpose':
            path.concat('vehicle/purpose');
            windowHeader.concat('vehicle purpose');
            break;
        case 'OperationType':
            path.concat('operation/type');
            windowHeader.concat('operation type');
            break;
        case 'ServiceTypes':
            path.concat('service/type');
            windowHeader.concat('service type');
            break;
        case 'Function':
            path.concat('person/function');
            windowHeader.concat('employee\'s function');
            break;
    }
    const newId = useMemo(() => {
        axios({
            method: 'get',
            url: `${config.API_URL}${path}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
        .then((response) => {
            console.log(Array.length(response.data));
            return Array.length(response.data);       
        })
        .catch(() => {

        });
    });
    const addItem = useCallback((path) => {
        axios({
            method: 'post',
            url: `${config.API_URL}${path}`,
            data: {
                id: newId,
                name: input,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data);
            window.location.reload();         
        })
        .catch(() => {
            
        });
    }, [newId, input])

    const cancelAdding = (() => {

    });

    // support for the enter key without reloading the page
    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            addItem();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [addItem]);

    return (
        <div>
            <Container component="main" maxwidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form>
                        <h1 alignItems='center'>{windowHeader}</h1>
                        <TextField
                            error={errorFlag}
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
                            onClick={addItem}
                            variant="contained"
                            fullWidth
                        >
                            Add
                        </Button>
                        <Button
                            onClick={cancelAdding}
                            variant="contained"
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}