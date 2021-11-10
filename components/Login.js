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
import Link from 'next/link'
import { useRouter } from 'next/router'
const axios = require('axios');

function LoginForm(props) {

    const router = useRouter()
    const [inputvalue,setValue] = useState({})
    const [errorMessage,setErrorMessage] = useState('')

    function handleChange(e){
        let name = e.target.id;
        console.log('name is',name);
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
         url: API_BASE_URL + '/users/login/',
         data: {
            email: inputvalue.useremail,
            password: inputvalue.userpass,
         }
       }).then(function (response) {
         console.log(response);
         let statusCode = response.status;
         if(statusCode == '200'){
            let token = response.data.token;
            sessionStorage.setItem("token", token);
            router.push('/profile')
         }
       })
       .catch(function (error) {
           console.log('e is', error);
       });
    }
 
    
    if(typeof(Storage) !== "undefined"){
         console.log(sessionStorage.getItem("token"));
    }

    console.log('errorMessage',errorMessage);
    return (
        <form  noValidate autoComplete="off" className="w-full h-screen flex items-start flex-col justify-center">
           
            <Box className='pb-3 w-full'>
                <TextField fullWidth  id="useremail" label="User Email" onChange={handleChange}  />
            </Box>
            <Box className='pb-3 w-full'>
                <TextField fullWidth  id="userpass" label="User Password" onChange={handleChange}  />
            </Box>
           
            <Box className='w-full' >
                <Button fullWidth  size="large" variant="contained" onClick={handleSubmitForm}>Login</Button>
            </Box>
            <Box className='pt-2'>
                <p>
                    Don't have account? 
                    <Link  href="/signup" >
                        <a className="no-underline text-base  inline-flex text-blue-600">
                        Signup
                        </a>
                        
                    </Link>
                     Now
                </p>
            </Box>
            
        </form>
    );
}

export default LoginForm;