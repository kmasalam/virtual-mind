import React, { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const axios = require('axios');
import Grid from '@mui/material/Grid';
import NavigationBar from '../components/NavigationBar'
import { API_BASE_URL } from '../api/api';

function Loader(props) {
    return (
        <Container maxWidth="lg">
            <Box >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        Loading..
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Loader;