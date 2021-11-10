import React, { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const axios = require('axios');
import Grid from '@mui/material/Grid';
import NavigationBar from '../components/NavigationBar'
import { API_BASE_URL } from '../api/api';
import Loader from '../components/Loader'
import { useRouter } from 'next/router'

function Tasks(props) {

    const router = useRouter()
    const [taskList,setTaskList] = useState('');
    const [showPage,setShowPage] = useState(false)

   

    function loadTasks(){
        var currentSession = '';
        if(typeof(Storage) !== "undefined"){
            currentSession = sessionStorage.getItem("token")
            console.log('currentSession',currentSession);
       }
        axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer '+ currentSession,
            },
            url: API_BASE_URL + '/tasks/',
            })
            .then(function (response) {
                if(response.status == 200 && response.data.length > 0){
                    setTaskList(response.data)
                }
            }).catch(function (error) {
                console.log(error);
              });
    }

    useEffect(() => {

        if((window.sessionStorage && window.sessionStorage.getItem('token') !== null)){
            setShowPage(true)
            return loadTasks();
       }else{
            router.push('/')
        }
        
       
      }, []);

      

      if(!taskList && taskList.length<1){
            return(
                <>
                    <NavigationBar/>
                    <Loader/>
                </>
            )
      }
      console.log('show page', showPage);
    return (
        <>
        <NavigationBar/>
        <Container maxWidth="lg">
            <Box >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid className="" container spacing={2}>
                            {
                                taskList && taskList.map((item,i)=>{
                                    return(
                                        <Grid item xs={3} key={i}>
                                            <Box className=' p-3 border'>
                                                <h4 className="text-base">Title: <span>{item.description}</span></h4>
                                                <h4 className="text-base">Completed: <span>{item.completed ? 'Yes' : 'No'}</span></h4>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>
    );
}

export default Tasks;