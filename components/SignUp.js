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
import { useRouter } from 'next/router'
const axios = require('axios');

function SignUpForm(props) {
    const router = useRouter()
    const [inputvalue,setValue] = useState({})
    const [signupstatus,setSignupstatus] = useState(false);
    const [errorMessage,setErrorMessage] = useState('')

    function handleChange(e){
        let name = e.target.id;
        let value = e.target.value;
 
        setValue[name] = value
        setValue({
            ...setValue
        })
    }
 
    function handleSubmitForm(){
     axios({
         method: 'post',
         headers: {
             'Content-Type': 'application/json',
         },
         url: API_BASE_URL + '/users/',
         data: {
             name: inputvalue.username,
             email: inputvalue.useremail,
             age: inputvalue.userage,
             password: inputvalue.userpass,
         }
       }).then(function (response) {
         console.log('res',response);
         let statusCode = response.status;
         if(statusCode == '201'){
            setSignupstatus(true);
             let token = response.data.token;
             sessionStorage.setItem("token", token);
             router.push('/task')
         }
       })
       .catch(function (error) {
            setErrorMessage(error.response.data)
       });
    }
 
    
    if(typeof(Storage) !== "undefined"){
         console.log(sessionStorage.getItem("token"));
    }
   

    return (
        <form  noValidate autoComplete="off" className="w-full h-screen flex items-start flex-col justify-center">
            <Box className='pb-3 w-full'>
                <TextField fullWidth  id="username" label="User Name" onChange={handleChange}  />
            </Box>
            <Box className='pb-3 w-full'>
                <TextField fullWidth  id="useremail" label="User Email" onChange={handleChange}  />
            </Box>
            <Box className='pb-3 w-full'>
                <TextField fullWidth  id="userpass" label="User Password" onChange={handleChange}  />
            </Box>
            <Box className='pb-3 w-full'>
                <TextField fullWidth  id="userage" type="number" label="User Age"  onChange={handleChange} />
            </Box>
            <Box className='w-full' >
                <Button fullWidth  size="large" variant="contained" onClick={handleSubmitForm}>SignUp</Button>
            </Box>
            {
                errorMessage ? <>
                {errorMessage}
                </>: ''
            }
        </form>
    );
}

export default SignUpForm;