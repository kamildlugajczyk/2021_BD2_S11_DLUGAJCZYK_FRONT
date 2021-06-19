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

export default function BasicAdder(props) {
    const classes = useStyles();
    const [input, setInput] = useState("");
    var path = '/';
    var windowHeader = 'Add '
    switch(props.item){
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
    console.log(`${config.API_URL}${path}`);
    const addItem = useCallback((path) => {
        axios({
            method: 'post',
            url: `${config.API_URL}${path}`,
            data: {
                id: null,
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