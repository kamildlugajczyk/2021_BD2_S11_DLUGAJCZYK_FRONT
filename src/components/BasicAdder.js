import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import config from '../config';

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

export default function BasicAdder(item) {
    const classes = useStyles();
    const [input, setInput] = useState("");
    const [newId, setNewId] = useState(0);
    var path = '/';
    var windowHeader = 'Add '
    switch(item){
        case 'Type':
            path+='vehicle/type';
            windowHeader+='vehicle type';
            break;
        case 'Purpose':
            path+='vehicle/purpose';
            windowHeader+='vehicle purpose';
            break;
        case 'OperationType':
            path+='operation/type';
            windowHeader+='operation type';
            break;
        case 'ServiceTypes':
            path+='service/type';
            windowHeader+='service type';
            break;
        case 'Function':
            path+='person/function';
            windowHeader+='employee\'s function';
            break;
        default:
            windowHeader+='default';
            break;
    }
    console.log(path);
    console.log(windowHeader);
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.API_URL}${path}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
            }
        })
        .then((response) => {
            setNewId(Array.length(response.data));     
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
        <div alignItems='center'>
            <Container >
                <CssBaseline />
                <div className={classes.paper}>
                    <form>
                        <h1 alignItems='center'>{windowHeader}</h1>
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
                            onClick={addItem}
                            variant="contained"
                            fullWidth
                            bottomMargin='50px'
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