import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router'

// User Defined
import NavigationBar from '../components/NavigationBar'
import LeftBanner from '../components/LeftBanner';
import SignUp from '../components/SignUp'
import Login from '../components/Login'

export default function Index() {

    const [showlogin,setShowlogin] = useState(true)

    useEffect(() => {
        if((typeof(sessionStorage) !== "undefined") && sessionStorage.getItem("token") !== null){
            setShowlogin(false)
       }
       
      }, []);
  return (
    <Box className='flex flex-col '>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=David+Libre:wght@400;500;700||display=swap" rel="stylesheet"/>
        </Head>
        <NavigationBar/>
        <Container maxWidth="lg" className='flex-grow'>
            <Box >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <LeftBanner title={'Virtual Mind'} showlogin={showlogin}/>
                    </Grid>
                    <Grid item xs={4}>
                        {
                            showlogin ? <>
                            <Login/>
                            </>: <>
                            </>
                        }
                        
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </Box>
  );
}