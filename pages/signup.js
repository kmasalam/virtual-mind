import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// User Defined
import NavigationBar from '../components/NavigationBar'
import LeftBanner from '../components/LeftBanner';
import SignUp from '../components/SignUp'
import Login from '../components/Login'

export default function Index() {
  return (
    <>
        <NavigationBar/>
        <Container maxWidth="lg">
            <Box >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <LeftBanner title={'Virtual Mind'}/>
                    </Grid>
                    <Grid item xs={4}>
                        <SignUp/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>
  );
}