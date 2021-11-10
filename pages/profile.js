import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const axios = require('axios');
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import NavigationBar from '../components/NavigationBar'
import { API_BASE_URL } from '../api/api';
import ProfileContent from '../components/ProfileContent'
import { useRouter } from 'next/router'

function Profile(props) {
    const router = useRouter()
    const [profile,setProfile] = useState(null);
    const [error,setError] = useState('')
    const [showPage,setShowPage] = useState(false)

   


    function loadProfile(){
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
               
                if(response.status == 200){
                    setProfile(response.data)
                }
               
            }).catch(function (error) {
                if(error.response.status == '401'){
                    setError('Please Authenticate')
                }
              });
    }

    useEffect(() => {

        if((window.sessionStorage && window.sessionStorage.getItem('token') !== null)){
            setShowPage(true)
            return loadProfile();
       }else{
            router.push('/')
        }
        
       
      }, []);

      
    return (
        <>
            <NavigationBar/>
            <Container maxWidth="lg">
                <Box >
                    {
                        profile  ? <>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <ProfileContent profileData={profile}/>
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                        </Grid>
                        </> : error !== '' ? <>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Alert severity="error">
                                {error}
                                </Alert>
                            </Grid>
                        </Grid>
                        </> : <>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                Loading
                            </Grid>
                        </Grid>
                        </>
                    }
                    
                </Box>
            </Container>
        </>
    );
}

export default Profile;