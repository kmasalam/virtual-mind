import React, { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const axios = require('axios');
import Grid from '@mui/material/Grid';
import NavigationBar from '../components/NavigationBar'
import { API_BASE_URL } from '../api/api';
import LeftBanner from '../components/LeftBanner';
import CreateTaskForm from '../components/CreateTaskForm';
import { useRouter } from 'next/router'


function CreateTask(props) {
    const router = useRouter()
    const [showPage,setShowPage] = useState(false)

    

    useEffect(() => {

        if((window.sessionStorage && window.sessionStorage.getItem('token') !== null)){
            setShowPage(true)
       }else{
            router.push('/')
        }
        
       
      }, []);
    return (
        <>
        <NavigationBar/>
        <Container maxWidth="lg">
            <Box >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <LeftBanner title={'Virtual '}/>
                    </Grid>
                    <Grid item xs={4}>
                        <CreateTaskForm/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>
    );
}

export default CreateTask;