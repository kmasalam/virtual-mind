import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import Button from '@mui/material/Button';
const axios = require('axios');
import { API_BASE_URL } from '../api/api';
import { useRouter } from 'next/router'


function NavigationBar(props) {
    const router = useRouter()
    const [profile,setProfile] = useState(false);

    function logoutProfile(e){
        console.log('clicked');
        e.preventDefault();
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
            url: API_BASE_URL + '/users/me/',
            })
            .then(function (response) {
               console.log('res',response);
                if(response.status == 200){
                    setProfile(true)
                    sessionStorage.removeItem("token");
                    sessionStorage.clear();
                    router.push('/')
                }
            }).catch(function (error) {
                console.log(error);
              });
    }

    useEffect(() => {

        if((window.sessionStorage && window.sessionStorage.getItem('token') !== null)){
            return setProfile(true)
       }
        
       
      }, []);

    
      console.log('user rfes',profile);
    return (
        <Box className="mb-2 ">
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={12}>
                        <Box className='border-b pt-3 pb-3 flex items-center justify-between'>
                            <Box>
                                <Link  href="/" >
                                    <a className="no-underline text-base p-2 inline-flex leading-4">
                                    Home
                                    </a>
                                </Link>
                                <Link  href="/task"  >
                                    <a className="no-underline text-base p-2 inline-flex">
                                    Tasks
                                    </a>
                                </Link>
                                <Link  href="/create-task" >
                                    <a className="no-underline text-base p-2 inline-flex">
                                    Create Task
                                    </a>
                                </Link>
                                <Link  href="/profile"  >
                                    <a className="no-underline text-base p-2 inline-flex">
                                    Profile
                                    </a>
                                </Link>
                            </Box>
                            <Box>
                                {
                                    profile ? <>
                                    <Button className="current-fonts" variant="text" onClick={(e)=>logoutProfile(e)}>
                                        Logout
                                    </Button>
                                    </> : <></>
                                }
                                
                            </Box>
                        </Box>
                        
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default NavigationBar;