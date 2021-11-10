import Head from 'next/head'
import React, { useState } from 'react';
import { API_BASE_URL } from '../api/api';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router'
const axios = require('axios');

function CreateTaskForm(props) {

    const router = useRouter()
    const [inputvalue,setValue] = useState({})
    const [checked, setChecked] = React.useState(true);

    function handleChange(e){
        let name = e.target.id;
        var value;
        
        if(name == 'completed'){
             value = e.target.checked;
        }else{
             value = e.target.value;
        }
     
 
        setValue[name] = value
        setValue({
            ...setValue
        })
    }


    function handleSubmitForm(){
        var currentSession = '';
        if(typeof(Storage) !== "undefined"){
            currentSession = sessionStorage.getItem("token")
       }
        axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer '+ currentSession,
            },
            url: API_BASE_URL + '/tasks/',
            data: {
                description: inputvalue.description,
                completed: inputvalue.completed,
            }
          }).then(function (response) {
            let statusCode = response.status;
            if(statusCode == '201'){
                router.push('/task');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
       }


       
    return (
        <form  noValidate autoComplete="off" className="w-full h-screen flex items-start flex-col justify-center">
            <Box className='pb-3 w-full'>
                <TextField fullWidth  id="description" label="Task Name" onChange={handleChange}  />
            </Box>
            <Box className='pb-3 w-full'>
            <FormGroup>
                <FormControlLabel control={<Checkbox
                id="completed"
                checked={inputvalue.completed || false}
                onChange={handleChange}
                />} label="Completed" />
            </FormGroup>
            
            </Box>
            
            <Box className='w-full' >
                <Button fullWidth  size="large" variant="contained" onClick={handleSubmitForm}>
                    Create Task
                </Button>
            </Box>
        
        </form>
    );
}

export default CreateTaskForm;